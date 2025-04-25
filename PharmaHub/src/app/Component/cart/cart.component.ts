import { Component, OnInit } from '@angular/core';
import { AddcartserviceService } from '../../services/addcartservice.service';
import { ApiProductService } from '../../services/api-product.service';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  Subtotal = 0;
  selectedValue: string = '';
  cardHolder: string = '';
  CardTypes = ['CashOnDelivery', 'CreditCard', 'PayPal', 'ApplePay', 'AmazonPay'];

  stripe: Stripe | null = null;
  cardElement: StripeCardElement | null = null;
  cardFilled: boolean = false;
  constructor(
    private cartService: AddcartserviceService,
    private apiProductService: ApiProductService
  ) {}

  async ngOnInit(): Promise<void> {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.Subtotal = items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    });

    this.stripe = await loadStripe('pk_test_51RHZw4PK5XOSrA1PWEjgvw63rKSq8rptz56CwuGgIxQuneI9z8LNTfsubHAMXwFLYC0DDQodrubROD5CZzmRiQW600dRbPxrhK');
    if (this.stripe) {
      const elements = this.stripe.elements();
      const card = elements.create('card');
      card.mount('#card-element');
      this.cardElement = card;
  
      card.on('change', (event: any) => {
        const displayError = document.getElementById('card-errors');
        if (displayError) {
          displayError.textContent = event.error ? event.error.message : '';
        }
  
        this.cardFilled = event.complete; // لما يكمّل البيانات تعتبر متعبية
      });
  }}

  async submitProduct() {
    const productAmounts: { [key: string]: number } = {};
    this.cartItems.forEach(item => {
      const quantity = item.quantity || 1;
      productAmounts[item.id] = quantity;
    });

    const body: any = {
      customerId: localStorage.getItem('userId'),
      paymentMethod: this.selectedValue,
      orderStatus: 'Pending',
      productAmounts: productAmounts
    };

    if (this.selectedValue === 'CreditCard' && this.stripe && this.cardElement) {
      const token = await this.createStripeToken();
      if (!token) return;
      body.paymentToken = token;
    } else {
      body.paymentToken = 'tok_visa';
    }

    console.log('Order body:', body);

    this.apiProductService.addOrder(body).subscribe({
      next: res => {
        alert('Order placed successfully!');
        this.cartItems = [];
        this.cartService.clearCart();
      },
      error: err => {
        console.error(err);
        alert('Error placing order!');
      }
    });
  }

  async createStripeToken(): Promise<string | null> {
    const { token, error } = await this.stripe!.createToken(this.cardElement!);
    if (error) {
      alert('Stripe Error: ' + error.message);
      return null;
    }
    return token?.id ?? null;
  }

  get subtotal(): number {
    return this.cartService.getSubtotal();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
