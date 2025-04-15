import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ioffers } from '../../Models/ioffers';
import { DiscountPipe } from '../Pipes/discount.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offers',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [FormsModule, CommonModule , DiscountPipe , RouterModule],

  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent {
  offers: Ioffers[];
  currentIndex = 0;
  cardsPerView = 3;
  constructor() {
    this.offers = [
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
        DissPrice: 0,
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
        DissPrice: 20,
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
        DissPrice: 0,
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
        DissPrice: 20,
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
        DissPrice: 20,
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 6',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        DissPrice: 20,
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 7',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        DissPrice: 20,
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 8',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        DissPrice: 20,
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 9',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        DissPrice: 20,
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 10',
        description: [
          'This is compnet 1',
          'This is compnet 2',
          'This is compnet 3',
        ],
        id: 1,
        pharmName: 'tobgy',
        price: 1555,
        imgPharm: './logo.png',
        DissPrice: 20,
        isFlipped: false,
      },
    ];
    this.updateCardsPerView();
    window.addEventListener('resize', this.updateCardsPerView.bind(this));
  }

  get limitedOffers() {
    const nondiss = this.offers.filter((offer) => offer.DissPrice !== 0);
    return nondiss.slice(0, 6);
  }

  // get visibleCards() {
  //   return this.limitedOffers.slice(this.currentIndex, this.currentIndex + 3);
  // }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(this.limitedOffers.length - 3, 0);
    }
    console.log(this.offers[this.currentIndex].description);
  }

  moveRight() {
    if (this.currentIndex < this.limitedOffers.length - 3) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateCardsPerView.bind(this));
  }
  updateCardsPerView() {
    this.cardsPerView = window.innerWidth <= 768 ? 1 : 3;
  }

  get visibleCards() {
    return this.limitedOffers.slice(
      this.currentIndex,
      this.currentIndex + this.cardsPerView
    );
  }
}
