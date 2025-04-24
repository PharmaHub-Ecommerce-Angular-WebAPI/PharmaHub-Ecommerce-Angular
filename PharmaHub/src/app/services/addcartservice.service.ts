import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AddcartserviceService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems() {
    return [...this.cartItems]; // return a copy
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
