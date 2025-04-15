import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ipackage } from '../../Models/ipackage';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaxpriceService } from '../../services/maxprice.service';
import { PharmNameService } from '../../services/pharm-name.service';

@Component({
  selector: 'app-display-packages',
  standalone: true,
  imports: [FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './display-packages.component.html',
  styleUrl: './display-packages.component.css'
})
export class DisplayPackagesComponent {
  allPackages: Ipackage[] = [];
  filteredPackages: Ipackage[] = [];
  currentPage = 1;
  cardsPerPage = 12;
  selectedPrice: number = Infinity;
  selectedPharmName: string | null = null;

  constructor(
    private priceService: MaxpriceService,
    private pharmNameService: PharmNameService
  ) {
    this.allPackages = [
      { imgUrl: './logo.png', name: 'Card 1', description: ['comp 1'], id: 1, pharmName: 'keky', price: 2000, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 2', description: ['comp 1'], id: 2, pharmName: 'tarshoby', price: 1500, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 3', description: ['comp 1'], id: 3, pharmName: 'almeldin', price: 4000, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 4', description: ['comp 1'], id: 4, pharmName: 'weso', price: 1926, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 5', description: ['comp 1'], id: 5, pharmName: 'khaled', price: 400, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 6', description: ['comp 1'], id: 6, pharmName: 'mahdy', price: 100, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 7', description: ['comp 1'], id: 7, pharmName: 'rewan', price: 600, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 8', description: ['comp 1'], id: 8, pharmName: 'emo', price: 800, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 9', description: ['comp 1'], id: 9, pharmName: 'roby', price: 500, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 10', description: ['comp 1'], id: 10, pharmName: 'ali', price: 100, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 11', description: ['comp 1'], id: 11, pharmName: 'koky', price: 2, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 12', description: ['comp 1'], id: 12, pharmName: 'hader', price: 555, imgPharm: './logo.png' },
      { imgUrl: './logo.png', name: 'Card 13', description: ['comp 1'], id: 13, pharmName: 'koko', price: 9080, imgPharm: './logo.png' }
    ];

    const max = Math.max(...this.allPackages.map(p => p.price));
    this.priceService.setMaxPrice(max);

    const uniquePharmNames = [...new Set(this.allPackages.map(p => p.pharmName))];
    this.pharmNameService.setPharmNames(uniquePharmNames);

    this.priceService.selectedPrice.subscribe(price => {
      this.selectedPrice = price;
      this.filterPackages();
    });

    this.pharmNameService.selectedPharmName$.subscribe(name => {
      this.selectedPharmName = name;
      this.filterPackages();
    });

    this.filteredPackages = [...this.allPackages];
  }

  filterPackages() {
    this.filteredPackages = this.allPackages.filter(pkg => {
      const matchesPrice = pkg.price <= this.selectedPrice;
      const matchesPharm = this.selectedPharmName ? pkg.pharmName === this.selectedPharmName : true;
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
