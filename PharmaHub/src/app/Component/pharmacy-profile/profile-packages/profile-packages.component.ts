import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { Ipackage } from '../../../Models/ipackage';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaxpriceService } from '../../../services/maxprice.service';
import { PharmNameService } from '../../../services/pharm-name.service';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { RouterModule } from '@angular/router';
import { ApiProductService } from '../../../services/api-product.service';
import { Iproduct } from '../../../Models/iproduct';
import { forkJoin } from 'rxjs';
import { DiscountPipe } from '../../Pipes/discount.pipe';
import { AddcartserviceService } from '../../../services/addcartservice.service';

@Component({
  selector: 'app-profile-packages',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiProductService],
  imports: [
    FormsModule,
    CommonModule,
    MoveUpAnimateDirective,
    RouterModule,
    DiscountPipe,
  ],
  templateUrl: './profile-packages.component.html',
  styleUrl: './profile-packages.component.css',
})
export class ProfilePackagesComponent implements OnInit {
  allPackages: Iproduct[] = [];
  filteredPackages: Iproduct[] = [];
  currentPage = 1;
  cardsPerPage = 12;
  selectedPrice: number = Infinity;
  selectedPharmName: string | null = null;
  @Input() product: any;

  constructor(
    private cartService: AddcartserviceService,
    private priceService: MaxpriceService,
    private pharmNameService: PharmNameService,
    private apiService: ApiProductService
  ) {}
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  alertadd() {
    alert('product added to cart');
  }
  
  ngOnInit(): void {
    // جلب البيانات من API واحدة
    const allPackages$ = this.apiService.getPackagesPHARMACY(); // استبدال forkJoin بـ API واحدة
  
    allPackages$.subscribe(
      (response: any[]) => {
        const formattedPackages = response.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          imgUrl: pkg.imageUrl,
          description: pkg.packageComponents,
          pharmName: pkg.pharmacyName,
          imgPharm: pkg.pharmacyLogo,
          price: pkg.price,
          isFlipped: false,
          discountRate: pkg.discountRate || 0, // إذا كانت العروض موجودة
        }));
  
        // تخزين جميع الباكجات في this.allPackages
        this.allPackages = formattedPackages;
  
        // ضبط الحد الأقصى للسعر (إذا كان موجودًا في البيانات)
        const maxPriceFromApi = this.allPackages.reduce(
          (max, pkg) => (pkg.price > max ? pkg.price : max),
          0
        );
        this.priceService.setMaxPrice(maxPriceFromApi);
  
        // استخراج أسماء الصيدليات الفريدة
        const uniquePharmNames = [
          ...new Set(this.allPackages.map((p) => p.pharmName)),
        ];
        this.pharmNameService.setPharmNames(uniquePharmNames);
  
        // تعيين الباكجات المفلترة
        this.filteredPackages = [...this.allPackages];
      },
      (error) => {
        console.error('Error fetching packages:', error);
      }
    );
  
    // الاشتراك في تحديث الفلترة حسب السعر
    this.priceService.selectedPrice.subscribe((price) => {
      this.selectedPrice = price;
      this.filterPackages();
    });
  
    // الاشتراك في تحديث الفلترة حسب اسم الصيدلية
    this.pharmNameService.selectedPharmName$.subscribe((name) => {
      this.selectedPharmName = name;
      this.filterPackages();
    });
  }
  
  

  filterPackages() {
    this.filteredPackages = this.allPackages.filter((pkg) => {
      const matchesPrice = pkg.price <= this.selectedPrice;
      const matchesPharm = this.selectedPharmName
        ? pkg.pharmName === this.selectedPharmName
        : true;
      return matchesPrice && matchesPharm;
    });
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPackages.length / this.cardsPerPage);
  }

  get visibleCards() {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    return this.filteredPackages.slice(start, start + this.cardsPerPage);
  }

  setPage(page: number) {
    this.currentPage = page;
  }
}
