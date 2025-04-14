import { Component } from '@angular/core';
import { PackagesComponent } from '../packages/packages.component';
import { OffersComponent } from '../offers/offers.component';
import { CustomerHeroComponent } from '../customer-hero/customer-hero.component';
import { PharmaciesComponent } from '../pharmacies/pharmacies.component';

@Component({
  selector: 'app-customer',
  imports: [
    PackagesComponent,
    OffersComponent,
    CustomerHeroComponent,
    PharmaciesComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {}
