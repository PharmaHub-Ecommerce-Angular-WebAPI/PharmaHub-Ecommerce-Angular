import { Component } from '@angular/core';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-pharmacies-entry',
  imports: [MoveUpAnimateDirective],
  templateUrl: './pharmacies-entry.component.html',
  styleUrl: './pharmacies-entry.component.css',
})
export class PharmaciesEntryComponent {
  imgUrl = './CustomerHero/P7.png';
}
