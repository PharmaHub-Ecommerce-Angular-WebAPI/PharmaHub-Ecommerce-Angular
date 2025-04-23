import { Component, ChangeDetectorRef } from '@angular/core';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pharmacist-sign-up',
  imports: [CommonModule, RouterModule, FormsModule, MoveUpAnimateDirective],
  templateUrl: './pharmacist-sign-up.component.html',
  styleUrl: './pharmacist-sign-up.component.css',
})
export class PharmacistSignUpComponent {
  constructor(private cdRef: ChangeDetectorRef, private authService: AuthService ,  private router: Router) {}
  signupemail: string = '';
  signupPassword: string = '';
  confirmPassword: string = '';
  location: string = '';
  selectedCountry: string = '';
  selectedCity: string = '';
  fullName: string = '';
  phoneNumber: string = '';
  pharmaName: string = '';
  creditCard: string = '';
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
  verificationCode: string = '';
  isCodeSent: boolean = false;
  isCodeVerified : boolean = false; 

  onCountryChange(): void {
    const country = this.countries.find((c) => c.name === this.selectedCountry);
    this.filteredCities = country ? country.cities : [];
    this.selectedCity = '';
  }
  certificateFile: File | null = null;
  certificateError: 'required' | 'invalidFile' | null = null;
  certificateTouched = false;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.certificateTouched = true;

    if (!input.files || input.files.length === 0) {
      this.certificateFile = null;
      this.certificateError = 'required';
      return;
    }
    const file = input.files[0];

    if (file.type !== 'application/pdf') {
      this.certificateFile = null;
      this.certificateError = 'invalidFile';
      return;
    }

    this.certificateFile = file;
    this.certificateError = null; // valid file
  }

  // Handle the file change event
  logoFile: File | null = null;
  logoError: 'required' | 'invalidType' | 'tooLarge' | null = null;
  logoTouched = false;

  onFileChange2(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.logoTouched = true;

    if (!input.files || input.files.length === 0) {
      this.logoFile = null;
      this.logoError = 'required';
      return;
    }

    const file = input.files[0];
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!validTypes.includes(file.type)) {
      this.logoFile = null;
      this.logoError = 'invalidType';
      return;
    }

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      this.logoFile = null;
      this.logoError = 'tooLarge';
      return;
    }

    // If all is good
    this.logoFile = file;
    this.logoError = null;
  }

  // Submit handler for form
  onSubmit(form: any) {
    if (
      form.invalid ||
      this.signupPassword !== this.confirmPassword ||
      !this.certificateFile ||
      !this.logoFile
    ) {
      return 'Invalid inputs or passwords do not match';
    }
    return 'Valid information ✅';
  }
  openTime: number = 1;
  closeTime: number = 10;
  is24Hours: boolean = false;

  openTimeError: boolean = false;
  closeTimeError: boolean = false;

  // Called when "Open 24 Hours" checkbox changes
  handle24HoursChange() {
    if (this.is24Hours) {
      this.openTime = 0;
      this.closeTime = 0;
      this.openTimeError = false;
      this.closeTimeError = false;
    } else {
      this.openTime = 1;
      this.closeTime = 10;
    }
  }

  // Prevent typing invalid keys (like 'e', '-', or '0')
  preventInvalidKeys(event: KeyboardEvent) {
    const invalidKeys = ['e', 'E', '+', '-', '.', '0'];
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  // Enforce input range 1–24 manually
  enforceRange(field: 'open' | 'close') {
    if (this.is24Hours) return;

    if (field === 'open') {
      this.openTimeError = this.openTime < 1 || this.openTime > 24;
    } else {
      this.closeTimeError = this.closeTime < 1 || this.closeTime > 24;
    }
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
  
     const formData = new FormData();
    formData.append('UserName', this.fullName);
    formData.append('PhoneNumber', this.phoneNumber);
    formData.append('Email', this.signupemail);
    formData.append('Country', this.selectedCountry);
    formData.append('city', this.selectedCity);
    formData.append('Address', this.location);
    formData.append('PharmacyName', this.pharmaName);
    formData.append('CreditCardNumber', this.creditCard);
    formData.append('OpenTime', this.is24Hours ? '0' : `${this.openTime}`);
    formData.append('CloseTime', this.is24Hours ? '0' : `${this.closeTime}`);
    formData.append('Password', this.signupPassword);
    formData.append('ConfirmPassword', this.confirmPassword);
    if (this.certificateFile) {
      formData.append('FormalPapersURL', this.certificateFile, this.certificateFile.name);
    }
    
    if (this.logoFile) {
      formData.append('LogoURL', this.logoFile, this.logoFile.name);
    }
    console.log('Signup Form Data:', formData);
  
    
    this.authService.signupPharmacy(formData).subscribe({
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

  

}
