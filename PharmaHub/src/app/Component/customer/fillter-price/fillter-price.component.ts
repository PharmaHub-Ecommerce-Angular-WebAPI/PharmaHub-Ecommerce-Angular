import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaxpriceService } from '../../../services/maxprice.service';

@Component({
  selector: 'app-fillter-price',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './fillter-price.component.html',
  styleUrl: './fillter-price.component.css',
})
export class FillterPriceComponent implements OnInit {
  sliderValue: number = 0;
  maxPrice: number = 100;

  constructor(private priceService: MaxpriceService) {}

  ngOnInit(): void {
    this.priceService.maxPrice.subscribe((price) => {
      this.maxPrice = Math.ceil(price);
      this.sliderValue = price;
    });
  }

  onSliderChange() {
    this.priceService.updateSelectedPrice(this.sliderValue);
  }
}
