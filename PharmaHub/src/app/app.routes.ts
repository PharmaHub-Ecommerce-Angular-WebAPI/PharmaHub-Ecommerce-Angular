import { CustomerComponent } from "./Component/customer/customer.component";
import { HomeComponent } from "./Component/Home/home.component";
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent} ,
    {path: 'customer' , component : CustomerComponent}
]; 