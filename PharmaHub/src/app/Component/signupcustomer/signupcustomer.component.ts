import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


import { Router, RouterModule } from '@angular/router';

import { FormsModule, NgForm } from '@angular/forms';


import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';
import { ICustomerSignUp } from '../../Models/icustomer-sign-up';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signupcustomer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MoveUpAnimateDirective],
  providers: [AuthService],
  templateUrl: './signupcustomer.component.html',
  styleUrl: './signupcustomer.component.css',
})
export class SignupcustomerComponent {
  fullName: string = '';
  phoneNumber: string = '';
  signupemail: string = '';
  signupPassword: string = '';
  confirmPassword: string = '';
  location: string = '';
  selectedCountry: string = '';
  selectedCity: string = '';

  verificationCode: string = '';
  isCodeSent: boolean = false;
  isCodeVerified : boolean = false; 
  
  

  countries = [
    {
      name: 'Egypt',
      cities: ['Cairo', 'Alexandria', 'Giza', 'Port Said', 'Suez', 'Dakahlia', 'Sharqia', 'Qalyubia'],
    },
  ];
  filteredCities: string[] = [];

  constructor(private authService: AuthService ,  private router: Router) {}

  onCountryChange(): void {
    const country = this.countries.find((c) => c.name === this.selectedCountry);
    this.filteredCities = country ? country.cities : [];
    this.selectedCity = ''; 
  }

  sendVerificationCode(): void {
    const data = { 
      email: this.signupemail, 
      name: this.fullName };
    this.authService.sendVerificationCode(data).subscribe({
      next: (response) => {
        console.log('Verification code sent successfully:', response);
        this.isCodeSent = true;
      },
      error: (error) => {
        console.error('Error sending verification code:', error);
      }
    });
  }

  verifyCode(): void {
    const data = {
      email: this.signupemail,
      verificationCode: this.verificationCode,
    };
  
    this.authService.verifyCode(data).subscribe({
      next: (response) => {
        console.log('Code verified successfully:', response);
        this.isCodeVerified = true;
      },
      error: (error) => {
        console.error('Error verifying code:', error);
  
        if (error.error) {
          if (typeof error.error === 'string') {
            alert(`Verification failed: ${error.error}`);
          } else {
            alert('Unexpected error occurred while verifying the code.');
          }
        } else {
          alert('An unknown error occurred during verification.');
        }
      }
    });
  }
  
  signup() {
    if (this.signupPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    const selectedCityValue = this.selectedCity;  
  
    const signupData = {
      customerName: this.fullName,
      email: this.signupemail,
      phoneNumber: this.phoneNumber.toString(),  
      password: this.signupPassword,
      confirmPassword: this.confirmPassword,
      address: this.location,
      country: this.selectedCountry,
      city: selectedCityValue,  
    };
  
    
    console.log('Signup Form Data:', signupData);
  
    
    this.authService.signupCustomer(signupData).subscribe({
      next: (response) => {
        console.log('successfully ', response);
        alert('successfully registered!');
         this.router.navigate(['logincustomer']) ;  
         

      },
      error: (error) => {
        console.error('errors', error);
        if (error.error && error.error.includes("Email is already registered")) {
          alert('registration failed: Email is already registered.');
        } else {
          alert('An unknown error occurred during registration.');
        }
      }
    });
  }

  

  onSubmit(form: NgForm) {
    if (form.invalid || this.signupPassword !== this.confirmPassword) {
      return;
    }
  }

}
