import { Component } from '@angular/core';
import { SideparComponent } from './sidepar/sidepar.component';
import { PharmacyInfoComponent } from './pharmacy-info/pharmacy-info.component';
import { RouterOutlet } from '@angular/router';
import { ProductsInstockComponent } from './products-instock/products-instock.component';

@Component({
  selector: 'app-dash-pharmacies',
  imports: [SideparComponent , PharmacyInfoComponent , RouterOutlet , ProductsInstockComponent],
  templateUrl: './dash-pharmacies.component.html',
  styleUrl: './dash-pharmacies.component.css'
})
export class DashPharmaciesComponent {
  
}
