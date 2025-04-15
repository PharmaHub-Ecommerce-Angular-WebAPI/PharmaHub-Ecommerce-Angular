import { Component } from '@angular/core';
import { FillterPriceComponent } from '../fillter-price/fillter-price.component';
import { DisplayPackagesComponent } from '../display-packages/display-packages.component';
import { FillterPHnameComponent } from '../fillter-phname/fillter-phname.component';

@Component({
  selector: 'app-all-packages',
  imports: [FillterPriceComponent,DisplayPackagesComponent , FillterPHnameComponent ],
  templateUrl: './all-packages.component.html',
  styleUrl: './all-packages.component.css'
})
export class AllPackagesComponent {

}
