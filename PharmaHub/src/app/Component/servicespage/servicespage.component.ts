import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-servicespage',
  imports: [CommonModule, RouterModule, FormsModule, MoveUpAnimateDirective],
  templateUrl: './servicespage.component.html',
  styleUrl: './servicespage.component.css',
})
export class ServicespageComponent {}
