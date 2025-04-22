import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-and-register-customer',
  imports: [CommonModule, FormsModule, MoveUpAnimateDirective, RouterModule],
  templateUrl: './login-and-register-customer.component.html',
  styleUrl: './login-and-register-customer.component.css',
})
export class LoginAndRegisterCustomerComponent {
  loginemail: string = '';
  loginPassword: string = '';
  confirmPassword: string = '';
  onSubmit(form: NgForm) {
    if (form.invalid) return 'invalid inputs';
    return 'Valid information ✅';
  }
}
