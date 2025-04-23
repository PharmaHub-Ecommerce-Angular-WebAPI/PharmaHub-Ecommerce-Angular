import { AllOffersComponent } from './Component/customer/all-offers/all-offers.component';
import { AllPackagesComponent } from './Component/customer/all-packages/all-packages.component';
import { CustomerComponent } from './Component/customer/customer.component';
import { HomeComponent } from './Component/Home/home.component';

import { Routes } from '@angular/router';
import { ViewAllPharmaciesComponent } from './Component/customer/view-all-pharmacies/view-all-pharmacies.component';
import { DashPharmaciesComponent } from './Component/dash-pharmacies/dash-pharmacies.component';
import { AddproductComponent } from './Component/dash-pharmacies/addproduct/addproduct.component';
import { UpdateproductComponent } from './Component/dash-pharmacies/updateproduct/updateproduct.component';
import { DeleteproductComponent } from './Component/dash-pharmacies/deleteproduct/deleteproduct.component';
import { PharmacyInfoComponent } from './Component/dash-pharmacies/pharmacy-info/pharmacy-info.component';
import { AboutUsComponent } from './Component/about-us/about-us.component';
import { LoginAndRegisterCustomerComponent } from './Component/login-and-register-customer/login-and-register-customer.component';

import { SignupcustomerComponent } from './Component/signupcustomer/signupcustomer.component';
import { PharmacistSignUpComponent } from './Component/pharmacist-sign-up/pharmacist-sign-up.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'allpackages', component: AllPackagesComponent },
  { path: 'alloffers', component: AllOffersComponent },
  { path: 'allpharmacies', component: ViewAllPharmaciesComponent },
  { path: 'AboutUs', component: AboutUsComponent },
  { path: 'logincustomer', component: LoginAndRegisterCustomerComponent },
  { path: 'pharmacyinfo', component: PharmacyInfoComponent },

  { path: 'CustomerSignUp', component: SignupcustomerComponent },
  { path: 'PharmacistSignUp', component: PharmacistSignUpComponent },
  {
    path: 'pharmacy',
    component: DashPharmaciesComponent,
    children: [
      { path: '', redirectTo: 'pharmacyinfo', pathMatch: 'full' },
      { path: 'pharmacyinfo', component: PharmacyInfoComponent },
      { path: 'addproduct', component: AddproductComponent },

      { path: 'updateproduct', component: UpdateproductComponent },
      { path: 'deleteproduct', component: DeleteproductComponent },
    ],
  },
];
