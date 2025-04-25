import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}
@Injectable({
  providedIn: 'root',
})
export class AddcartserviceService {
  private cartItemsKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<any[]>(this.loadCartItems());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  private loadCartItems(): any[] {
    const saved = localStorage.getItem(this.cartItemsKey);
    return saved ? JSON.parse(saved) : [];
  }

  private saveCartItems(items: any[]) {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(items));
  }

  addToCart(product: any) {
    const currentItems = this.cartItemsSubject.value;

    if (currentItems.length > 0) {
      const currentPharmacy = currentItems[0].pharmName?.trim().toLowerCase();
      const incomingPharmacy = product.pharmName?.trim().toLowerCase();

      console.log(
        'Current pharmacy (trimmed and lowercased):',
        currentPharmacy
      );
      console.log(
        'Incoming pharmacy (trimmed and lowercased):',
        incomingPharmacy
      );

      if (incomingPharmacy !== currentPharmacy) {
        alert('You can only add products from the same pharmacy to the cart.');

        const productIndex = currentItems.findIndex(
          (item) => item.id === product.id
        );
        if (productIndex !== -1) {
          currentItems.splice(productIndex, 1);
          this.cartItemsSubject.next(currentItems);
          this.saveCartItems(currentItems);
        }

        return;
      }
    }

    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      currentItems.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next(currentItems);
    this.saveCartItems(currentItems);

    console.log('Updated cart items:', currentItems);
  }

  removeFromCart(productId: number) {
    const updated = this.cartItemsSubject.value.filter(
      (item) => item.id !== productId
    );
    this.cartItemsSubject.next(updated);
    this.saveCartItems(updated);
  }

  getSubtotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    this.saveCartItems([]);
  }
  updateQuantity(productId: string, quantity: number) {
    const items = this.cartItemsSubject.value;
    const existingItem = items.find((i) => i.productId === productId);

    if (existingItem) {
      existingItem.quantity = quantity;
      this.cartItemsSubject.next(items); // Emit updated cart
    }
  }
}
