import { Component } from '@angular/core';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-offers-entery',
  imports: [MoveUpAnimateDirective],
  templateUrl: './offers-entery.component.html',
  styleUrl: './offers-entery.component.css',
})
export class OffersEnteryComponent {
  imgUrl = './CustomerHero/P8.png';
}
