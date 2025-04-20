// sidepar.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { UpdateproductComponent } from '../updateproduct/updateproduct.component';
import { DeleteproductComponent } from '../deleteproduct/deleteproduct.component';
import { PharmacyInfoComponent } from '../pharmacy-info/pharmacy-info.component';

@Component({
  selector: 'app-sidepar',
  imports : [CommonModule , FormsModule, RouterModule , AddproductComponent , RouterOutlet  , DeleteproductComponent , UpdateproductComponent , PharmacyInfoComponent],   
  templateUrl: './sidepar.component.html',
  styleUrls: ['./sidepar.component.css']
})
export class SideparComponent {
  isMenuOpen = false;
  activeItem: string = '';

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleItem(item: string): void {
    this.activeItem = this.activeItem === item ? '' : item;
  }
}
