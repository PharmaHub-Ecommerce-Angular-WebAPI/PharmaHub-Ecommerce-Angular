import { DisplayPackagesComponent } from '../../customer/display-packages/display-packages.component';
import { AddcartserviceService } from '../../../services/addcartservice.service';
import { ApiProductService } from '../../../services/api-product.service';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';

import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ioffers } from '../../../Models/ioffers';
import { MaxpriceService } from '../../../services/maxprice.service';
import { PharmNameService } from '../../../services/pharm-name.service';
import { DiscountPipe } from '../../Pipes/discount.pipe';

@Component({
  selector: 'app-profile-offers',
  imports: [
    DisplayPackagesComponent,
    RouterModule,
    RouterLink,
    CommonModule,
    DiscountPipe,
  ],
  templateUrl: './profile-offers.component.html',
  styleUrl: './profile-offers.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileOffersComponent {
  offers: Ioffers[] = [];
  filteredPackages: Ioffers[] = [];
  currentPage = 1;
  cardsPerPage = 12;
  selectedPrice: number = Infinity;
  selectedPharmName: string | null = null;
  @Input() product: any;

  constructor(
    private priceService: MaxpriceService,
    private pharmNameService: PharmNameService,
    private apiService: ApiProductService,
    private cartService: AddcartserviceService
  ) {}
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  alertadd() {
    alert('product added to cart');
  }
  ngOnInit(): void {
    // جلب العروض
    this.apiService.getOffers().subscribe((response: any[]) => {
      this.offers = response.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        imgUrl: pkg.imageUrl,
        description: pkg.packageComponents,
        pharmName: pkg.pharmacyName,
        imgPharm: pkg.pharmacyLogo,
        price: pkg.price,
        isFlipped: false,
        DissPrice: pkg.discountRate,
      }));

      const uniquePharmNames = [
        ...new Set(this.offers.map((p) => p.pharmName)),
      ];
      this.pharmNameService.setPharmNames(uniquePharmNames);

      this.filteredPackages = [...this.offers];
    });

    this.apiService.getmaxpriceOffers().subscribe((res: any) => {
      if (res && res.maxPrice) {
        this.priceService.setMaxPrice(res.maxPrice);
      }
    });

    this.priceService.selectedPrice.subscribe((price) => {
      this.selectedPrice = price;
      this.filterPackages();
    });

    this.pharmNameService.selectedPharmName$.subscribe((name) => {
      this.selectedPharmName = name;
      this.filterPackages();
    });
  }

  filterPackages() {
    this.filteredPackages = this.offers.filter((pkg) => {
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
