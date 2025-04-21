import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaxpriceService } from '../../../services/maxprice.service';
import { Ioffers } from '../../../Models/ioffers';
import { PharmNameService } from '../../../services/pharm-name.service';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { RouterModule } from '@angular/router';
import { ApiProductService } from '../../../services/api-product.service';
import { DiscountPipe } from "../../Pipes/discount.pipe";

@Component({
  selector: 'app-display-offers',
  standalone: true,
  imports: [FormsModule, CommonModule, MoveUpAnimateDirective, RouterModule, DiscountPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiProductService],
  templateUrl: './display-offers.component.html',
  styleUrl: './display-offers.component.css',
})
export class DisplayOffersComponent {
  offers: Ioffers[] = [];
  filteredPackages: Ioffers[] = [];
  currentPage = 1;
  cardsPerPage = 12;
  selectedPrice: number = Infinity;
  selectedPharmName: string | null = null;

  constructor(
    private priceService: MaxpriceService,
    private pharmNameService: PharmNameService ,
        private apiService: ApiProductService
    
  ) {}
    
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

