import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IPharmacies } from '../../Models/ipharmacies';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pharmacy-profile',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './pharmacy-profile.component.html',
  styleUrl: './pharmacy-profile.component.css',
})
export class PharmacyProfileComponent {
  imgUrl1: string = './logo.png';
  imgUrl2: string = './Pharmacies/1.png';
  pharmacies: IPharmacies[];
  constructor() {
    this.pharmacies = [
      {
        id: '1',
        Name: 'Pharmacy 1',
        imgUrl: './assets/pharmacy1.jpg',
      },
      {
        id: '2',
        Name: 'Pharmacy 2',

        imgUrl: './assets/pharmacy2.jpg',
      },
    ];
  }
}
