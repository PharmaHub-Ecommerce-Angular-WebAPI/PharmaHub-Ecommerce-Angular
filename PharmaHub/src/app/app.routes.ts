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
import { AddPakageComponent } from './Component/dash-pharmacies/add-pakage/add-pakage.component';
import { AddMedicineComponent } from './Component/dash-pharmacies/add-medicine/add-medicine.component';
import { AddBeautyProductComponent } from './Component/dash-pharmacies/add-beauty-product/add-beauty-product.component';
import { AddPersonalCareComponent } from './Component/dash-pharmacies/add-personal-care/add-personal-care.component';
import { AddHealthDeviceComponent } from './Component/dash-pharmacies/add-health-device/add-health-device.component';
import { AdminComponent } from './Component/admin/admin.component';
import { PharmacyProfileComponent } from './Component/pharmacy-profile/pharmacy-profile.component';
import { CartComponent } from './Component/cart/cart.component';
import { ProfilePackagesComponent } from './Component/pharmacy-profile/profile-packages/profile-packages.component';
import { ProfileMedicinesComponent } from './Component/pharmacy-profile/profile-medicines/profile-medicines.component';
import { ProfileBeautyProductComponent } from './Component/pharmacy-profile/profile-beauty-product/profile-beauty-product.component';
import { ProfilePersonalCareComponent } from './Component/pharmacy-profile/profile-personal-care/profile-personal-care.component';
import { ProfileHealthDevicesComponent } from './Component/pharmacy-profile/profile-health-devices/profile-health-devices.component';
import { ProfileOffersComponent } from './Component/pharmacy-profile/profile-offers/profile-offers.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'admin', component: AdminComponent },

  { path: 'home', component: HomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'allpackages', component: AllPackagesComponent },
  { path: 'alloffers', component: AllOffersComponent },
  { path: 'allpharmacies', component: ViewAllPharmaciesComponent },
  { path: 'AboutUs', component: AboutUsComponent },
  { path: 'logincustomer', component: LoginAndRegisterCustomerComponent },
  { path: 'pharmacyinfo', component: PharmacyInfoComponent },
  {
    path: 'pharmacyprofile',
    component: PharmacyProfileComponent,
    children: [
      { path: '', redirectTo: 'profileOffers', pathMatch: 'full' },
      { path: 'profilepackages', component: ProfilePackagesComponent },
      { path: 'profileMedicines', component: ProfileMedicinesComponent },
      {
        path: 'profileBeautyProduct',
        component: ProfileBeautyProductComponent,
      },
      {
        path: 'profilePersonalCare',
        component: ProfilePersonalCareComponent,
      },
      {
        path: 'profileHealthDevice',
        component: ProfileHealthDevicesComponent,
      },
      {
        path: 'profileOffers',
        component: ProfileOffersComponent,
      },
    ],
  },

  { path: 'CustomerSignUp', component: SignupcustomerComponent },
  { path: 'PharmacistSignUp', component: PharmacistSignUpComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'pharmacy',
    component: DashPharmaciesComponent,
    children: [
      { path: '', redirectTo: 'pharmacyinfo', pathMatch: 'full' },
      { path: 'pharmacyinfo', component: PharmacyInfoComponent },
      {
        path: 'addproduct',
        component: AddproductComponent,
        children: [
          // { path: '', redirectTo: 'addproduct', pathMatch: 'full' },
          // { path: 'addproduct', component: AddproductComponent} ,

          { path: 'addpackage', component: AddPakageComponent },
          { path: 'addmedicine', component: AddMedicineComponent },
          { path: 'addbeautyproduct', component: AddBeautyProductComponent },
          { path: 'addpersonalcare', component: AddPersonalCareComponent },
          { path: 'addhealth', component: AddHealthDeviceComponent },
        ],
      },

      { path: 'updateproduct', component: UpdateproductComponent },
      { path: 'deleteproduct', component: DeleteproductComponent },
    ],
  },
];
