import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-and-register-customer',
  imports: [CommonModule, FormsModule, MoveUpAnimateDirective, RouterModule],
  standalone: true,
  templateUrl: './login-and-register-customer.component.html',
  styleUrl: './login-and-register-customer.component.css',
})
export class LoginAndRegisterCustomerComponent {
  //// formdata 
  loginemail: string = '';
  loginPassword: string = '';
  confirmPassword: string = '';


  constructor(private authService: AuthService , private router: Router) {
  }
  
  

  login() {
    const loginData = {
      email: this.loginemail,
      password: this.loginPassword
    };
  
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
  
        this.router.navigate(['customer']);
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Invalid email or password.');
      }
    });
  }
  

  onSubmit(form: NgForm) {
    if (form.invalid) return 'invalid inputs';
    return 'Valid information ✅';
  }

}
