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
  currentRoute = '';
  navbarItems: NavbarItem[] = [];
  showLogoutButton = false;
  showLogiutButton = true;

  constructor(private router: Router, private authService: AuthService ,private apipharmacy: ApiPharmacyService) {}

  private searchSubject = new Subject<string>();
  pharmacies: any[] = [];

  ngOnInit() {
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

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query.length >= 5) {
          return this.apipharmacy.getSearchPharmacies(query);
        } else {
          this.showDropdown = false;
          return of([]);
        }
      })
    ).subscribe((pharmacies) => {
      this.pharmacies = pharmacies;
      this.showDropdown = pharmacies.length > 0;
    });
  }
  
  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }
  
 

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
        { label: 'Services', route: '/services' },
        { label: 'About Us', route: '/AboutUs' },
        { label: 'Contact', route: '/contact' },
      ];
    } else if (this.userRole === 'Customer') {
      this.navbarItems = [
        { label: 'Services', route: '/services' },
        { label: 'Favourites', route: '/favourites' },
        { label: 'Pharmacies', route: '/allpharmacies' },
        { label: 'About Us', route: '/AboutUs' },
        { label: 'Contact', route: '/contact' },
      ];
    } else {
      this.navbarItems = [
        { label: 'Home', route: '/' },
        { label: 'Services', route: '/services' },
        { label: 'About Us', route: '/AboutUs' },
        { label: 'Contact us', route: '/about-us' },
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

  searchText: string = '';
  showDropdown = false;
  allOptions: string[] = [];
  filteredOptions: string[] = [];

  onSearchChange() {
    const input = this.searchText.trim();
    if (input === '') {
      this.filteredOptions = [];
      this.showDropdown = false;
    }
  }

  searchQuery: string = '';
  selectedSearchType: string = 'simple';

  performSearch() {
    if (this.selectedSearchType === 'simple') {
      console.log('Simple Search:', this.searchQuery);
    } else if (this.selectedSearchType === 'advanced') {
      console.log('Advanced Search:', this.searchQuery);
    }
  }
}
