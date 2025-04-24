import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddcartserviceService } from '../../services/addcartservice.service';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';
@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, MoveUpAnimateDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  Subtotal = 0;
  constructor(private cartService: AddcartserviceService) {}
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.Subtotal = items.reduce((total, item) => total + item.price, 0);
    });
  }
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
  get subtotal(): number {
    return this.cartService.getSubtotal();
  }
}
