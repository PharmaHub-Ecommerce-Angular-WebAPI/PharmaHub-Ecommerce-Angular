import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaxpriceService } from '../../../services/maxprice.service';
import { Ioffers } from '../../../Models/ioffers';
import { PharmNameService } from '../../../services/pharm-name.service';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-display-offers',
  standalone: true,
  imports: [FormsModule, CommonModule, MoveUpAnimateDirective, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './display-offers.component.html',
  styleUrl: './display-offers.component.css',
})
export class DisplayOffersComponent {
  offers: Ioffers[];
  filteredPackages: Ioffers[] = [];
  currentPage = 1;
  cardsPerPage = 12;
  selectedPrice: number = Infinity;
  selectedPharmName: string | null = null;

  constructor(
    private priceService: MaxpriceService,
    private pharmNameService: PharmNameService
  ) {
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
        pharmName: 'khaled',
        price: 1000,
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
        pharmName: 'weso',
        price: 2000,
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
        pharmName: 'roro',
        price: 3000,
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
        pharmName: 'mahdy',
        price: 4000,
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
        pharmName: 'emo',
        price: 5000,
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
        pharmName: 'weso',
        price: 6000,
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
        pharmName: 'koky',
        price: 7000,
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
        pharmName: 'soso',
        price: 8000,
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
        pharmName: 'koko',
        price: 9000,
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
        pharmName: 'weso',
        price: 500,
        imgPharm: './logo.png',
        DissPrice: 20,
        isFlipped: false,
      },
    ];

    const max = Math.max(...this.offers.map((p) => p.price));
    this.priceService.setMaxPrice(max);

    const uniquePharmNames = [...new Set(this.offers.map((p) => p.pharmName))];
    this.pharmNameService.setPharmNames(uniquePharmNames);

    this.priceService.selectedPrice.subscribe((price) => {
      this.selectedPrice = price;
      this.filterPackages();
    });

    this.pharmNameService.selectedPharmName$.subscribe((name) => {
      this.selectedPharmName = name;
      this.filterPackages();
    });

    this.filteredPackages = [...this.offers];
  }

  filterPackages() {
    this.filteredPackages = this.offers.filter((pkg) => {
      const matchesPrice = pkg.price <= this.selectedPrice;
      const matchesPharm =
        this.selectedPharmName && this.selectedPharmName.trim() !== ''
          ? pkg.pharmName === this.selectedPharmName
          : true;
      return matchesPrice && matchesPharm;
    });
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPackages.length / this.cardsPerPage);
  }

  get visibleCards() {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    return this.filteredPackages.slice(start, start + this.cardsPerPage);
  }

  setPage(page: number) {
    this.currentPage = page;
  }
}

//     const max = Math.max(...this.offers.map(p => p.price));
//     this.priceService.setMaxPrice(max);

//     this.priceService.selectedPrice.subscribe(value => {
//       this.filteredPackages = this.offers.filter(p => p.price <= value);
//       this.currentPage = 1;
//     });
//   }

//   get totalPages(): number {
//     return Math.ceil(this.filteredPackages.length / this.cardsPerPage);
//   }

//   get visibleCards() {
//     const start = (this.currentPage - 1) * this.cardsPerPage;
//     return this.filteredPackages.slice(start, start + this.cardsPerPage);
//   }

//   setPage(page: number) {
//     this.currentPage = page;
//   }
// }
