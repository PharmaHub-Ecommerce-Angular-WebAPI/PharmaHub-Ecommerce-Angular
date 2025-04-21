import { Component } from '@angular/core';
import { PackagesComponent } from './packages/packages.component';
import { OffersComponent } from './offers/offers.component';
import { CustomerHeroComponent } from './customer-hero/customer-hero.component';
import { PharmaciesComponent } from './pharmacies/pharmacies.component';
import { PackageHeadingComponent } from './package-heading/package-heading.component';
import { PharmaciesEntryComponent } from './pharmacies-entry/pharmacies-entry.component';
import { OffersEnteryComponent } from './offers-entery/offers-entery.component';
import { FooterMarqueeComponent } from './footer-marquee/footer-marquee.component';
import { AboutUsComponent } from '../about-us/about-us.component';

@Component({
  selector: 'app-customer',
  imports: [
    PackagesComponent,
    OffersComponent,
    CustomerHeroComponent,
    PharmaciesComponent,
    PackageHeadingComponent,
    PharmaciesEntryComponent,
    OffersEnteryComponent,
    FooterMarqueeComponent,
    AboutUsComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {}
