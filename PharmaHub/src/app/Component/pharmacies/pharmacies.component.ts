import { Component } from '@angular/core';
import { IPharmacies } from '../../Models/ipharmacies';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacies',
  imports: [CommonModule],
  templateUrl: './pharmacies.component.html',
  styleUrl: './pharmacies.component.css',
})
export class PharmaciesComponent {
  pharmacies: IPharmacies[];

  constructor() {
    this.pharmacies = [
      { id: '1', Name: 'Abdellatif Eltarshouby', imgUrl: './Pharmacies/1.png' },
      { id: '2', Name: 'Al Amir', imgUrl: './Pharmacies/2.png' },
      { id: '3', Name: 'El Ezaby', imgUrl: './Pharmacies/3.png' },
      { id: '4', Name: 'Eltarshouby', imgUrl: './Pharmacies/4.png' },
    ];
  }
}
