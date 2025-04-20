import { Component } from '@angular/core';
import { Ipackage } from '../../../Models/ipackage';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-instock',
  imports: [FormsModule , CommonModule,],
  templateUrl: './products-instock.component.html',
  styleUrl: './products-instock.component.css'
})
export class ProductsInstockComponent {
allPackages: Ipackage[] ;
constructor() {
    this.allPackages = [
      {
        imgUrl: './logo.png',
        name: 'Card 1',
        description: ['comp 1'],
        id: 1,
        pharmName: 'keky',
        price: 2000,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 2',
        description: ['comp 1'],
        id: 2,
        pharmName: 'tarshoby',
        price: 1500,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 3',
        description: ['comp 1'],
        id: 3,
        pharmName: 'almeldin',
        price: 4000,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 4',
        description: ['comp 1'],
        id: 4,
        pharmName: 'weso',
        price: 1926,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 5',
        description: ['comp 1'],
        id: 5,
        pharmName: 'khaled',
        price: 400,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 6',
        description: ['comp 1'],
        id: 6,
        pharmName: 'mahdy',
        price: 100,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 7',
        description: ['comp 1'],
        id: 7,
        pharmName: 'rewan',
        price: 600,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 8',
        description: ['comp 1'],
        id: 8,
        pharmName: 'emo',
        price: 800,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 9',
        description: ['comp 1'],
        id: 9,
        pharmName: 'roby',
        price: 500,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 10',
        description: ['comp 1'],
        id: 10,
        pharmName: 'ali',
        price: 100,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 11',
        description: ['comp 1'],
        id: 11,
        pharmName: 'koky',
        price: 2,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 12',
        description: ['comp 1'],
        id: 12,
        pharmName: 'hader',
        price: 555,
        imgPharm: './logo.png',
        isFlipped: false,
      },
      {
        imgUrl: './logo.png',
        name: 'Card 13',
        description: ['comp 1'],
        id: 13,
        pharmName: 'koko',
        price: 9080,
        imgPharm: './logo.png',
        isFlipped: false,
      },
    ];

    
  }}
