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
      this.loadProducts(); // يعيد تحميل المنتجات
    });
  }
  // loadProducts() {
  //   const pharmacyId = localStorage.getItem('userId');
  //   if (pharmacyId) {
  //     this.apiProductService.getProductById(pharmacyId).subscribe((res: any) => {
  //       this.allPackages = res;
  //     });
  //   }
  // }

  ////////////////////ممم
  // loadProducts() {
  //   const pharmacyId = localStorage.getItem('userId');
  //   if (pharmacyId) {
  //     this.apiProductService.getProductById(pharmacyId).subscribe((res: any[]) => {
  //       this.allPackages = res;
  
  //       // تجميع حسب الـ category
  //       this.groupedPackages = {};
  //       res.forEach(pkg => {
  //         const category = pkg.category || 'Uncategorized';
  //         if (!this.groupedPackages[category]) {
  //           this.groupedPackages[category] = [];
  //         }
  //         this.groupedPackages[category].push(pkg);
  //       });
  
  //       // استخراج أسماء الكاتيجوري لعرضها
  //       this.categories = Object.keys(this.groupedPackages);
  //     });
  //   }
  // }
  loadProducts() {
    const pharmacyId = localStorage.getItem('userId');
    if (pharmacyId) {
      this.apiProductService.getProductById(pharmacyId).subscribe((res: any) => {
        // تحقق من شكل الـ response
        console.log(res); // للتأكد من شكل الاستجابة
  
        // إذا كانت الاستجابة تحتوي على بيانات ضمن خاصية معينة (مثل data)
        // يجب التعامل معها بشكل مناسب
        const products: Iproduct[] = res.data || res; // تعديل هذا الجزء حسب الهيكل الفعلي للـ response
  
        this.allPackages = products;
  
        // تجميع حسب الـ category
        this.groupedPackages = {};
        products.forEach(pkg => {
          const category = pkg.category || 'Uncategorized';
          if (!this.groupedPackages[category]) {
            this.groupedPackages[category] = [];
          }
          this.groupedPackages[category].push(pkg);
        });
  
        // استخراج أسماء الكاتيجوري لعرضها
        this.categories = Object.keys(this.groupedPackages);
      });
    }
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe(); // تنظيف الاشتراك
  }
}
