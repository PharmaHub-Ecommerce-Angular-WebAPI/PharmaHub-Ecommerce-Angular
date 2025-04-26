import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  HostListener,
} from '@angular/core';
import { defineElement } from 'lord-icon-element';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiPharmacyService } from '../../services/api-pharmacy.service';
import { SearchResult, SearchService } from '../../services/search.service';

import { AddcartserviceService } from '../../services/addcartservice.service';
interface NavbarItem {
  label: string;
  route: string;
  icon?: string;
  href?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [AuthService],
})
export class NavBarComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  userRole: string = '';
  cartItemCount: number = 0;
  currentRoute = '';
  navbarItems: NavbarItem[] = [];
  showLogoutButton = false;
  showLogiutButton = true;


  
  selectedSearchType: string = '';
  searchTerm: string = '';
  searchResults: SearchResult[] = [];
  showDropdown: boolean = false;


  constructor(private router: Router, private authService: AuthService ,private apipharmacy: ApiPharmacyService , private cartService: AddcartserviceService,private searchService: SearchService) {}

  private searchSubject = new Subject<string>();
  pharmacies: any[] = [];


  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      // Calculate the total count based on quantity of each item in the cart
      this.cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role ?? '';
      this.setNavbarItemsBasedOnRole();
      this.updateLogoutVisibility();
    });

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.updateLogoutVisibility();
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.updateLogoutVisibility();
      }
    });

    this.userRole = localStorage.getItem('role') ?? '';
    this.setNavbarItemsBasedOnRole();


    defineElement(lottie.loadAnimation);
const token = localStorage.getItem('token');
    if (!token) {
      this.showLogiutButton = true;
    } else {
      this.showLogiutButton = false;
    }

    // this.searchSubject.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((query) => {
    //     if (query.length >= 5) {
    //       return this.apipharmacy.getSearchPharmacies(query);
    //     } else {
    //       this.showDropdown = false;
    //       return of([]);
    //     }
    //   })
    // ).subscribe((pharmacies) => {
    //   this.pharmacies = pharmacies;
    //   this.showDropdown = pharmacies.length > 0;
    // });
    
  }



  
  onSearch() {
    if (!this.searchTerm.trim()) {
      this.searchResults = [];
      return;
    }

    const isAdvanced = this.selectedSearchType === 'advanced';
    this.searchService.searchProducts(this.searchTerm, isAdvanced)
      .subscribe(results => {
        this.searchResults = results;
        this.showDropdown = results.length > 0;
      });
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchResults = [];
    this.showDropdown = false;
  }

  selectProduct(result: SearchResult) {
    // Save pharmacyId to local storage
    localStorage.setItem('pharmacyId', result.pharmacyId);
    
    // Navigate to pharmacy profile
    this.router.navigate(['/pharmacyprofile']).then(() => {
      // After navigation succeeds, do a hard reload
      window.location.reload();
    });

    
    window.location.reload();
    // Close the dropdown
    this.showDropdown = false;
    this.searchTerm = '';
    this.searchResults = [];
  }
  
  ngOnDestroy() {
    localStorage.removeItem('pharmacyId');
  }
  // onSearchInput() {
  //   this.searchSubject.next(this.searchQuery);
  // }
  
 

  updateLogoutVisibility() {
    const token = localStorage.getItem('token');
   

    this.showLogoutButton = !!token ;
  }
  updateLoginVisibility() {
    const token = localStorage.getItem('token');
   

    this.showLogiutButton =!! token ;
  }


  setNavbarItemsBasedOnRole() {
    if (this.userRole === 'Pharmacy') {
      this.navbarItems = [
        { label: 'Dashboard', route: '/pharmacy' },
        { label: 'Services', route: '/Services' },
        { label: 'About Us', route: '/AboutUs' },
        { label: 'Contact', route: '/contactus' },
      ];
    } else if (this.userRole === 'Customer') {
      this.navbarItems = [
        { label: 'Services', route: '/Services' },
        { label: 'Products', route: '/customer' },
        { label: 'Favourites', route: '/favourites' },
        { label: 'About Us', route: '/AboutUs' },
        { label: 'Contact', route: '/contactus' },
      ];
    } else {
      this.navbarItems = [
        { label: 'Home', route: '/home' },
        { label: 'Services', route: '/Services' },
        { label: 'About Us', route: '/AboutUs' },
        { label: 'Contact us', route: '/contactus' },
      ];
    }
  }

  onLogout() {
    this.authService.logout();
    window.location.href = '/home';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideBurger = target.closest('.hamburger');
    const clickedInsideNav = target.closest('.nav-links');

    if (!clickedInsideBurger && !clickedInsideNav) {
      this.isMenuOpen = false;
    }
  }

  // searchText: string = '';
  // showDropdown = false;
  // allOptions: string[] = [];
  // filteredOptions: string[] = [];

  // onSearchChange() {
  //   const input = this.searchText.trim();
  //   if (input === '') {
  //     this.filteredOptions = [];
  //     this.showDropdown = false;
  //   }
  // }

  // searchQuery: string = '';
  // selectedSearchType: string = 'simple';

  // performSearch() {
  //   if (this.selectedSearchType === 'simple') {
  //     console.log('Simple Search:', this.searchQuery);
  //   } else if (this.selectedSearchType === 'advanced') {
  //     console.log('Advanced Search:', this.searchQuery);
  //   }
  // }
}
