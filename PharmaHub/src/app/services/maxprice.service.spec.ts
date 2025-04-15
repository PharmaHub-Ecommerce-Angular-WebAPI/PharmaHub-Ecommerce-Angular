// filter-price.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterPriceService {
  private maxPriceSubject = new BehaviorSubject<number>(0);
  maxPrice$ = this.maxPriceSubject.asObservable();

  private selectedPriceSubject = new BehaviorSubject<number>(0);
  selectedPrice$ = this.selectedPriceSubject.asObservable();

  setMaxPrice(price: number) {
    this.maxPriceSubject.next(price);
  }

  setSelectedPrice(price: number) {
    this.selectedPriceSubject.next(price);
  }
}
