import { Component } from '@angular/core';
import { DisplayOffersComponent } from '../display-offers/display-offers.component';
import { FillterPriceComponent } from '../fillter-price/fillter-price.component';
import { FillterPHnameComponent } from '../fillter-phname/fillter-phname.component';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-all-offers',
  imports: [
    DisplayOffersComponent,
    FillterPriceComponent,
    FillterPHnameComponent,
    MoveUpAnimateDirective,
  ],
  templateUrl: './all-offers.component.html',
  styleUrl: './all-offers.component.css',
})
export class AllOffersComponent {}
