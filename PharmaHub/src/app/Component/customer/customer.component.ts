import { Component } from '@angular/core';
import { PackagesComponent } from '../packages/packages.component';
import { OffersComponent } from '../offers/offers.component';

@Component({
  selector: 'app-customer',
  imports: [PackagesComponent , OffersComponent  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

}
