import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      email: this.loginemail,
      password: this.loginPassword,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        const token = response.token;
        localStorage.setItem('token', token);

        const decodedToken: any = jwtDecode(token);
        const role =
          decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];
        const userName =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ];
        const userId =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ];
        this.authService.setUserRole(role);
        localStorage.setItem('role', role);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userId', userId);

        if (role === 'Customer') {
          window.location.href = '/customer';
        } else if (role === 'Pharmacy') {
          window.location.href = '/pharmacy';
        } else if (role === 'Admin') {
          window.location.href = '/pharmacy';
        } else {
          alert('Unknown role');
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Invalid email or password.');
      },
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return 'invalid inputs';
    return 'Valid information ✅';
  }
}
