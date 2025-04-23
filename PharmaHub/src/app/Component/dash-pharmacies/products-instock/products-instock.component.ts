import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiProductService } from '../../../services/api-product.service';
import { ProductUpdateService } from '../../../services/product-update.service';
import { Subscription } from 'rxjs';


interface Iproduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discountRate: number;
  category: string;
  imageUrl: string;
  packagesComponents?: { componentName: string }[];
}
@Component({
  selector: 'app-products-instock',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [ApiProductService],
  templateUrl: './products-instock.component.html',
  styleUrls: ['./products-instock.component.css']
})


export class ProductsInstockComponent implements OnInit {
  // allPackages: any[] = [];
  allPackages: Iproduct[] = [];
  private subscription: Subscription | null = null;
  categories: string[] = [];
  groupedPackages: { [key: string]: any[] } = {};
  
  
  constructor(private apiProductService: ApiProductService ,    private productUpdateService: ProductUpdateService
  ) {}

  ngOnInit() {
    this.loadProducts();
    const pharmacyId = localStorage.getItem('userId');
  
    if (pharmacyId) {
      this.apiProductService.getProductById(pharmacyId).subscribe((res: any) => {
        
        this.allPackages = res;
       
      });
    } else {
      console.error('Pharmacy ID not found in localStorage');
    }
    this.subscription = this.productUpdateService.productAdded$.subscribe(() => {
      console.log('🔄 Detected new product addition, reloading...');
      this.loadProducts(); 



    });
  }
  

 
  
  loadProducts() {
    const pharmacyId = localStorage.getItem('userId');
    if (pharmacyId) {
      this.apiProductService.getProductById(pharmacyId).subscribe((res: any) => {
        
        console.log(res); 
  
   
        const products: Iproduct[] = res.data || res; 
       
        this.allPackages = products;
  
        this.groupedPackages = {};
        products.forEach(pkg => {
          const category = pkg.category || 'Uncategorized';
          if (!this.groupedPackages[category]) {
            this.groupedPackages[category] = [];
          }
          this.groupedPackages[category].push(pkg);
        });
  
        this.categories = Object.keys(this.groupedPackages);
      });
    }
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe(); 
  }
}
