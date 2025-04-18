import { Component } from '@angular/core';
import { IPharmacies } from '../../Models/ipharmacies';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-marquee',
  imports: [CommonModule],
  templateUrl: './footer-marquee.component.html',
  styleUrl: './footer-marquee.component.css',
})
export class FooterMarqueeComponent {
  pharmacies: IPharmacies[];
  loopedPharmacies: IPharmacies[]; // Array to hold the duplicated pharmacies for continuous scrolling
  constructor() {
    this.pharmacies = [
      { id: '1', Name: 'Abdellatif Eltarshouby', imgUrl: './Pharmacies/1.png' },
      { id: '2', Name: 'Al Amir', imgUrl: './Pharmacies/2.png' },
      { id: '3', Name: 'El Ezaby', imgUrl: './Pharmacies/3.png' },
      { id: '4', Name: 'Eltarshouby', imgUrl: './Pharmacies/4.png' },
      { id: '5', Name: 'Health Care', imgUrl: './Pharmacies/5.png' },
    ];
    this.loopedPharmacies = [...this.pharmacies, ...this.pharmacies]; // Duplicate the array for continuous scrolling
  }
  isViewReady = false;
}
