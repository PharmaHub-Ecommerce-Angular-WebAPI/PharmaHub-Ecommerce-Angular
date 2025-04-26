import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface OrderProduct {
  productId: string;
  amount: number;
  productName: string;
}

interface PharmacyOrder {
  id: string;
  customerName: string;
  customerLocation: string;
  paymentMethod: string;
  orderStatus: string;
  createdAt: string;
  totalAmount: number;
  products: OrderProduct[];
  expanded?: boolean;
}

@Component({
  selector: 'app-order-box',
  imports: [CommonModule],
  templateUrl: './order-box.component.html',
  styleUrl: './order-box.component.css'
})
export class OrderBoxComponent implements OnInit {

  orders: PharmacyOrder[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPharmacyOrders();
  }

  fetchPharmacyOrders(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.errorMessage = 'User ID not found in local storage';
      this.isLoading = false;
      return;
    }

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      this.errorMessage = 'Authentication token not found';
      this.isLoading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    this.http.get<PharmacyOrder[]>(
      `https://localhost:7290/api/orders/pahrmacyorders?pharmacyId=${userId}`,
      { headers }
    ).subscribe({
      next: (data) => {
        // Sort orders: Pending first, then by date (newest first)
        this.orders = data
          .map(order => ({
            ...order,
            expanded: false
          }))
          .sort((a, b) => {
            // Pending orders first
            if (a.orderStatus === 'Pending' && b.orderStatus !== 'Pending') return -1;
            if (a.orderStatus !== 'Pending' && b.orderStatus === 'Pending') return 1;
            
            // Then sort by date (newest first)
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load pharmacy orders';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  confirmOrder(orderId: string): void {
    if (!confirm('Are you sure you want to confirm this order?')) {
      return;
    }

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      this.errorMessage = 'Authentication token not found';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.put(
      `https://localhost:7290/api/orders/active/${orderId}`,
      { id: orderId },
      { headers }
    ).subscribe({
      next: () => {
        // Refresh the orders list
        this.fetchPharmacyOrders();
      },
      error: (err) => {
        console.error('Failed to confirm order', err);
        this.errorMessage = 'Failed to confirm order';
      }
    });
  }

  toggleOrder(order: PharmacyOrder): void {
    order.expanded = !order.expanded;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}