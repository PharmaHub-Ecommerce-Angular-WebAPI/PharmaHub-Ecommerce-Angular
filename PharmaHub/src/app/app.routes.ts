import { AllOffersComponent } from './Component/customer/all-offers/all-offers.component';
import { AllPackagesComponent } from './Component/customer/all-packages/all-packages.component';
import { CustomerComponent } from './Component/customer/customer.component';
import { HomeComponent } from './Component/Home/home.component';

import { Routes } from '@angular/router';
import { ViewAllPharmaciesComponent } from './Component/customer/view-all-pharmacies/view-all-pharmacies.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'allpackages', component: AllPackagesComponent },
  { path: 'alloffers', component: AllOffersComponent },
  { path: 'allpharmacies', component: ViewAllPharmaciesComponent },
];
