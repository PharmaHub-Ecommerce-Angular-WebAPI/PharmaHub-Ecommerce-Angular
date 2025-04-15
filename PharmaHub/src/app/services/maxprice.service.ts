import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaxpriceService {
  private maxPriceSource = new BehaviorSubject<number>(0);
  maxPrice = this.maxPriceSource.asObservable();

  private selectedPriceSource = new BehaviorSubject<number>(0);
  selectedPrice = this.selectedPriceSource.asObservable();

  setMaxPrice(price: number) {
    this.maxPriceSource.next(price);
    this.selectedPriceSource.next(price); 
  }

  updateSelectedPrice(price: number) {
    this.selectedPriceSource.next(price);
  }
}
