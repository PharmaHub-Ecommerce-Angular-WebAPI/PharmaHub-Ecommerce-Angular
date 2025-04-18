import { Component } from '@angular/core';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-package-heading',
  imports: [MoveUpAnimateDirective],
  templateUrl: './package-heading.component.html',
  styleUrl: './package-heading.component.css',
})
export class PackageHeadingComponent {
  imgUrl = './CustomerHero/P6.png';
}
