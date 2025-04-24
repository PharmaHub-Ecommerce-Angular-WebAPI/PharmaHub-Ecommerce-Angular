import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../../../services/api-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductUpdateService } from '../../../services/product-update.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css'],
  imports: [FormsModule, CommonModule]
})
export class UpdateproductComponent implements OnInit {
  productId: string = '';
  name: string = '';
  description: string = '';
  imageUrl: string = '';
  price: number = 0;
  quantity: number = 0;
  strength: number = 0;
  productDataLoaded: boolean = false;  

  constructor(private apiProductService: ApiProductService , private productUpdateService: ProductUpdateService) {}

  ngOnInit(): void {}

  getProductData(): void {
    if (this.productId) {
      this.apiProductService.getProductDetailsById(this.productId).subscribe(
        (productData: any) => {
          if (productData) {
            this.name = productData.name;
            this.description = productData.description;
            this.imageUrl = productData.imageUrl;
            this.price = productData.price;
            this.quantity = productData.quantity;
            this.strength = productData.strength;
            this.productDataLoaded = true;
          } else {
            console.error('Product not found!');
          }
        },
        error => {
          console.error('Error fetching product data:', error);
        }
      );
    }
  }
  

  onSubmit(): void {
    if (!this.productId || this.productId.trim() === '') {
      console.error('No productId found. Cannot update.');
      return;
    }
  
    const updatedProductData = {
      productId: this.productId,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      price: this.price,
      quantity: this.quantity,
      strength: this.strength
    };
  
    this.apiProductService.updateProduct(this.productId, updatedProductData).subscribe(
      response => {
        console.log('Product updated successfully:', response);
        alert('Product updated successfully!');

        this.resetForm();
        this.productUpdateService.notifyProductAdded();
      },
      error => {
        console.error('Error updating product:', error);
  
        
        if (error.error && error.error.errors) {
          const errors = error.error.errors;
          for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
              console.error(`${key}: ${errors[key].join(', ')}`);
            }
          }
        }
  
        alert('Error updating product!');
      }
    );
  }
  
  
  

  resetForm(): void {
    this.name = '';
    this.description = '';
    this.imageUrl = '';
    this.price = 0;
    this.quantity = 0;
    this.strength = 0;
    this.productId = '';  
    this.productDataLoaded = false;  
  }
}
