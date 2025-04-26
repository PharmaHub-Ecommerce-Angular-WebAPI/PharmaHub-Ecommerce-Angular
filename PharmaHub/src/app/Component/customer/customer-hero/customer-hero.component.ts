import { Component } from '@angular/core';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-hero',
  imports: [MoveUpAnimateDirective, RouterModule],
  templateUrl: './customer-hero.component.html',
  styleUrl: './customer-hero.component.css',
})
export class CustomerHeroComponent {
  imgUrl = './CustomerHero/P5.png';
}
