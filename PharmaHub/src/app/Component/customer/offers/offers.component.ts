import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ioffers } from '../../../Models/ioffers';
import { DiscountPipe } from '../../Pipes/discount.pipe';
import { RouterModule } from '@angular/router';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { ApiProductService } from '../../../services/api-product.service';
import { AddcartserviceService } from '../../../services/addcartservice.service';

@Component({
  selector: 'app-offers',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiProductService],
  imports: [
    FormsModule,
    CommonModule,
    DiscountPipe,
    RouterModule,
    MoveUpAnimateDirective,
  ],

  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent {
  offers: Ioffers[] = [];
  currentIndex = 0;
  cardsPerView = 3;
  @Input() product: any;

  constructor(
    private apiService: ApiProductService,
    private cartService: AddcartserviceService
  ) {
    this.updateCardsPerView();
    window.addEventListener('resize', this.updateCardsPerView.bind(this));
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  alertadd() {
    alert('product added to cart');
  }
  ngOnInit(): void {
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
    });
  }

  get limitedOffers() {
    return this.offers.slice(0, 6);
  }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(
        this.limitedOffers.length - this.cardsPerView,
        0
      );
    }
  }

  moveRight() {
    if (this.currentIndex < this.limitedOffers.length - this.cardsPerView) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateCardsPerView.bind(this));
  }

  updateCardsPerView() {
    this.cardsPerView = window.innerWidth <= 768 ? 1 : 3;
  }

  get visibleCards() {
    return this.limitedOffers.slice(
      this.currentIndex,
      this.currentIndex + this.cardsPerView
    );
  }
}
