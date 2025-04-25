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
  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: AddcartserviceService
  ) {}
  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      // Calculate the total count based on quantity of each item in the cart
      this.cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role ?? '';
      this.setNavbarItemsBasedOnRole();
    });
    this.userRole = localStorage.getItem('role') ?? '';
    this.setNavbarItemsBasedOnRole();
    defineElement(lottie.loadAnimation);

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.userRole = localStorage.getItem('role') ?? '';
      // this.updateNavbarItems();
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.userRole = localStorage.getItem('role') ?? '';
        this.setNavbarItemsBasedOnRole();
      }
    });
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
        { label: 'Favourites', route: '/favourites' },
        { label: 'Pharmacies', route: '/allpharmacies' },
        { label: 'About Us', route: '/AboutUs' },
        { label: 'Contact', route: '/contactus' },
      ];
    } else {
      // Not logged in or unknown role
      this.navbarItems = [
        { label: 'Home', route: '/home' },
        { label: 'Services', route: '/Services' },
        { label: 'About Us', route: '/AboutUs' },
        { label: 'Contact us', route: '/contactus' },
      ];
    }
  }
  // updateNavbarItems() {
  //   if (this.currentRoute.startsWith('/admin')) {
  //     this.navbarItems = [
  //       { label: 'Admin', route: '/admin' },
  //       { label: 'Dashboard', route: '/admin/users' },
  //       { label: 'Logout', route: '/logout' },
  //     ];
  //   } else if (this.isLoggedIn && this.userRole === 'Customer') {
  //     this.navbarItems = [
  //       { label: 'Services', route: '/services' },
  //       { label: 'Contact', route: '/contact' },
  //       { label: 'About Us', route: '/aboutus' },
  //       { label: 'Favourites', route: '/favourites' },
  //       { label: 'Pharmacies', route: '/allpharmacies' },
  //       { label: 'Cart', route: '/cart' },
  //     ];
  //   } else if (this.isLoggedIn && this.userRole === 'Pharmacy') {
  //     this.navbarItems = [
  //       { label: 'Services', route: '/services' },
  //       { label: 'Contact', route: '/contact' },
  //       { label: 'About Us', route: '/aboutus' },
  //       { label: 'Dashboard', route: '/pharmacy-dashboard' },
  //     ];
  //   } else {
  //     this.navbarItems = [
  //       { label: 'Services', route: '/services' },
  //       { label: 'Contact', route: '/contact' },
  //       { label: 'About Us', route: '/aboutus' },
  //     ];
  //   }
  // }

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
  // الكود ده عشان السيرش اللي في الناف عشان يعرض الاقتراحات اللي بتنزل وقت البحث محتاج يتعدل حسب ال api
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
      // Do the logic if Simple search Api Here
      console.log('Simple Search:', this.searchQuery);
    } else if (this.selectedSearchType === 'advanced') {
      // Do the logic if Advanced search Api Here
      console.log('Advanced Search:', this.searchQuery);
    }
  }
}
