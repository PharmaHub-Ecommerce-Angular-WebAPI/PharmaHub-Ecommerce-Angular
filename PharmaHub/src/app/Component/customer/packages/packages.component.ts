import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ipackage } from '../../../Models/ipackage';
import { RouterModule } from '@angular/router';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-packages',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule, CommonModule, RouterModule, MoveUpAnimateDirective],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit, OnDestroy {
  packages: Ipackage[];
  currentIndex = 0;
  cardsPerView = 3;
  resizeObserver: any;
  constructor() {
    this.packages = [
      {
        imgUrl: './logo.png',
        name: 'Card 1',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 2',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 3',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 4',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 5',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      // { imgUrl: './logo.png', name: 'Card 6', description :  ['This is compnet 1' , 'This is compnet 2' ,'This is compnet 3' ], id : 1 , pharmName: 'tobgy' , price : 1555 , imgPharm : './logo.png'  },
      // { imgUrl: './logo.png', name: 'Card 7', description :  ['This is compnet 1' , 'This is compnet 2' ,'This is compnet 3' ], id : 1 , pharmName: 'tobgy' , price : 1555 , imgPharm : './logo.png'  },
      // { imgUrl: './logo.png', name: 'Card 8', description :  ['This is compnet 1' , 'This is compnet 2' ,'This is compnet 3' ], id : 1 , pharmName: 'tobgy' , price : 1555 , imgPharm : './logo.png'  },
      // { imgUrl: './logo.png', name: 'Card 9', description :  ['This is compnet 1' , 'This is compnet 2' ,'This is compnet 3' ], id : 1 , pharmName: 'tobgy' , price : 1555 , imgPharm : './logo.png'  },
      // { imgUrl: './logo.png', name: 'Card 10', description : ['This is compnet 1' , 'This is compnet 2' ,'This is compnet 3' ] , id : 1 , pharmName: 'tobgy' , price : 1555 , imgPharm : './logo.png'  },
    ];
  }
  ngOnInit() {
    this.setCardsPerView();
    window.addEventListener('resize', this.setCardsPerView.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.setCardsPerView.bind(this));
  }
  setCardsPerView() {
    const width = window.innerWidth;
    if (width <= 768) {
      this.cardsPerView = 1;
    } else if (width <= 992) {
      this.cardsPerView = 2;
    } else {
      this.cardsPerView = 3;
    }
  }
  get limitedPackages() {
    return this.packages.slice(0, 6);
  }

  get visibleCards() {
    return this.limitedPackages.slice(
      this.currentIndex,
      this.currentIndex + this.cardsPerView
    );
  }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(
        this.limitedPackages.length - this.cardsPerView,
        0
      );
    }
    console.log(this.packages[this.currentIndex].description);
  }

  moveRight() {
    if (this.currentIndex < this.limitedPackages.length - this.cardsPerView) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
}
