import { Component } from '@angular/core';
import { FillterPriceComponent } from '../fillter-price/fillter-price.component';
import { DisplayPackagesComponent } from '../display-packages/display-packages.component';
import { FillterPHnameComponent } from '../fillter-phname/fillter-phname.component';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-packages',
  imports: [
    FillterPriceComponent,
    DisplayPackagesComponent,
    FillterPHnameComponent,
    MoveUpAnimateDirective,
    RouterModule,
  ],
  templateUrl: './all-packages.component.html',
  styleUrl: './all-packages.component.css',
})
export class AllPackagesComponent {}
