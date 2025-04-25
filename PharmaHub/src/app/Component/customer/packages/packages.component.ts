import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ipackage } from '../../../Models/ipackage';
import { RouterModule } from '@angular/router';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { ApiProductService } from '../../../services/api-product.service';
import { DiscountPipe } from '../../Pipes/discount.pipe';
import { AddcartserviceService } from '../../../services/addcartservice.service';
@Component({
  selector: 'app-packages',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiProductService],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MoveUpAnimateDirective,
    DiscountPipe,
  ],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit, OnDestroy {
  packages: Ipackage[] = [];
  currentIndex = 0;
  cardsPerView = 3;
  resizeObserver: any;
  @Input() product: any;
  constructor(
    private apiService: ApiProductService,
    private cartService: AddcartserviceService
  ) {
    this.setCardsPerView();
    window.addEventListener('resize', this.setCardsPerView.bind(this));
  }
  // ngOnInit() {
  //   this.setCardsPerView();
  //   window.addEventListener('resize', this.setCardsPerView.bind(this));
  // }
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  alertadd() {
    alert('product added to cart');
  }
  ngOnInit(): void {
    this.apiService.getPackages().subscribe((response: any[]) => {
      this.packages = response.map((pkg) => ({
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
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.setCardsPerView.bind(this));
  }

  setCardsPerView() {
    const width = window.innerWidth;
    if (width <= 768) {
      this.cardsPerView = 1;
    } else if (width <= 992) {
      this.cardsPerView = 2;
    } else {
      this.cardsPerView = 3;
    }
  }
  get limitedPackages() {
    return this.packages.slice(0, 6);
  }

  get visibleCards() {
    return this.limitedPackages.slice(
      this.currentIndex,
      this.currentIndex + this.cardsPerView
    );
  }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(
        this.limitedPackages.length - this.cardsPerView,
        0
      );
    }
    console.log(this.packages[this.currentIndex].description);
  }

  moveRight() {
    if (this.currentIndex < this.limitedPackages.length - this.cardsPerView) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
}
