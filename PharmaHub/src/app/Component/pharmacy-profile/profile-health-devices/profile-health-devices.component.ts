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
  selector: 'app-profile-health-devices',
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
  templateUrl: './profile-health-devices.component.html',
  styleUrl: './profile-health-devices.component.css',
})
export class ProfileHealthDevicesComponent implements OnInit {
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
    const packagesWithoutOffers$ = this.apiService.getPackages();
    const packagesWithOffers$ = this.apiService.getpackgeslimeted();
    const maxPrice$ = this.apiService.getmaxpricePackages();

    forkJoin([
      packagesWithoutOffers$,
      packagesWithOffers$,
      maxPrice$,
    ]).subscribe(
      ([nonOfferPackages, offerPackages, max]: [any[], any[], any]) => {
        const formattedNonOffer = nonOfferPackages.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          imgUrl: pkg.imageUrl,
          description: pkg.packageComponents,
          pharmName: pkg.pharmacyName,
          imgPharm: pkg.pharmacyLogo,
          price: pkg.price,
          isFlipped: false,
        }));

        const formattedOffers = offerPackages.map((offer) => ({
          id: offer.id,
          name: offer.name,
          imgUrl: offer.imageUrl,
          description: offer.packageComponents,
          pharmName: offer.pharmacyName,
          imgPharm: offer.pharmacyLogo,
          price: offer.price,
          discountRate: offer.discountRate,
          isFlipped: false,
        }));

        this.allPackages = [...formattedNonOffer, ...formattedOffers];

        const maxPriceFromApi = typeof max === 'number' ? max : parseFloat(max);
        this.priceService.setMaxPrice(maxPriceFromApi);

        const uniquePharmNames = [
          ...new Set(this.allPackages.map((p) => p.pharmName)),
        ];
        this.pharmNameService.setPharmNames(uniquePharmNames);

        this.filteredPackages = [...this.allPackages];
      }
    );

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
