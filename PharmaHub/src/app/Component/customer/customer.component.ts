import { Component } from '@angular/core';
import { PackagesComponent } from '../packages/packages.component';

@Component({
  selector: 'app-customer',
  imports: [PackagesComponent ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

}
