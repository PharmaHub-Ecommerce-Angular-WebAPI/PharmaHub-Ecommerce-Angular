import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-login-and-register-customer',
  imports: [CommonModule, FormsModule, MoveUpAnimateDirective],
  templateUrl: './login-and-register-customer.component.html',
  styleUrl: './login-and-register-customer.component.css',
})
export class LoginAndRegisterCustomerComponent {
  isSignup: boolean = false;
  selectedRole: string = '';

  loginemail: string = '';
  signupemail: string = '';

  loginPassword: string = '';
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

  switchToSignup(): void {
    this.isSignup = true;
  }

  switchToLogin(): void {
    this.isSignup = false;
  }

  onCountryChange(): void {
    const country = this.countries.find((c) => c.name === this.selectedCountry);
    this.filteredCities = country ? country.cities : [];
    this.selectedCity = ''; // reset city
  }
}
