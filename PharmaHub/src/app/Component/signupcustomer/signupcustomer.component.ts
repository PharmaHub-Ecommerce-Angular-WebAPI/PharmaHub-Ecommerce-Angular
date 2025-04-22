import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-signupcustomer',
  imports: [CommonModule, RouterModule, FormsModule, MoveUpAnimateDirective],
  templateUrl: './signupcustomer.component.html',
  styleUrl: './signupcustomer.component.css',
})
export class SignupcustomerComponent {
  signupemail: string = '';
  signupPassword: string = '';
  confirmPassword: string = '';
  location: string = '';
  selectedCountry: string = '';
  selectedCity: string = '';
  fullName: string = '';
  phoneNumber: string = '';
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
    this.selectedCity = ''; // reset city
  }
  onSubmit(form: NgForm) {
    if (form.invalid || this.signupPassword !== this.confirmPassword) {
      return;
    }
  }
}
