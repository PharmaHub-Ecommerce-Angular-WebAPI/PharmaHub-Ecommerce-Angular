import { Component } from '@angular/core';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacist-sign-up',
  imports: [CommonModule, RouterModule, FormsModule, MoveUpAnimateDirective],
  templateUrl: './pharmacist-sign-up.component.html',
  styleUrl: './pharmacist-sign-up.component.css',
})
export class PharmacistSignUpComponent {
  signupemail: string = '';
  signupPassword: string = '';
  confirmPassword: string = '';
  location: string = '';
  selectedCountry: string = '';
  selectedCity: string = '';
  countries = [
    {
      name: 'Egypt',
      cities: [
        'Cairo',
        'Alexandria',
        'Giza',
        'Port Said',
        'Suez',
        'Dakahlia',
        'Sharqia',
        'Qalyubia',
        'Kafr El Sheikh',
        'Gharbia',
        'Monufia',
        'Beheira',
        'Ismailia',
        'Gharbia',
        'Faiyum',
        'Beni Suef',
        'Minya',
        'Asyut',
        'Sohag',
        'Qena',
        'Luxor',
        'Aswan',
        'Red Sea',
        'New Valley',
        'Matrouh',
        'North Sinai',
        'South Sinai',
      ],
    },
  ];
  filteredCities: string[] = [];
  onCountryChange(): void {
    const country = this.countries.find((c) => c.name === this.selectedCountry);
    this.filteredCities = country ? country.cities : [];
    this.selectedCity = '';
  }
}
