import { Component } from '@angular/core';
import { ApiProductService } from '../../../services/api-product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductUpdateService } from '../../../services/product-update.service';

@Component({
  selector: 'app-deleteproduct',
  imports: [ FormsModule, CommonModule],
  standalone: true,
  templateUrl: './deleteproduct.component.html',
  styleUrl: './deleteproduct.component.css'
})
export class DeleteproductComponent {
 

  productId: string = ''; 

  constructor(private productService: ApiProductService , private productUpdateService: ProductUpdateService) {}

  onSubmit() {
    if (!this.productId) {
      alert('Please enter a product ID.');
      return;
    }

    this.productService.deleteProductById(this.productId).subscribe({
      next:()   => {
        alert(' Product deleted successfully.'),

        this.productUpdateService.notifyProductAdded();
        this.productId = ''
      },
      
      error: () => alert(' Failed to delete product.')
    });
  }
}
