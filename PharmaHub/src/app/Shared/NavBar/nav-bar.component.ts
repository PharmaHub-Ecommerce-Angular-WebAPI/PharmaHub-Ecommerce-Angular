import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA ,Input} from '@angular/core';
import { defineElement } from 'lord-icon-element';
import { NavigationEnd, Router , Event } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';

interface NavbarItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule ,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [AuthService] 
})


export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  currentRoute = '';
  navbarItems: NavbarItem[] = [];
  constructor(private router: Router, private authService: AuthService) {}
   ngOnInit() {
     // Initialize Lordicon
     defineElement(lottie.loadAnimation);

     this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.updateNavbarItems();
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.updateNavbarItems();
      }
    });
  }

  updateNavbarItems() {
    // Check for admin routes first
    if (this.currentRoute.startsWith('/admin')) {
      this.navbarItems = [
        { label: 'Admin', route: '/admin' },
        { label: 'Dashboard', route: '/admin/users' },
        { label: 'Logout', route: '/logout' }
      ];
    }
    // For logged-in users
    else if (this.isLoggedIn) {
      this.navbarItems = [
        { label: 'Home', route: '/home' },
        { label: 'Profile', route: '/profile' },
        { label: 'Dashboard', route: '/dashboard' },
        { label: 'Logout', route: '/logout' }
      ];
    }
    // For guests (not logged in)
    else {
      this.navbarItems = [
        { label: 'Contact', route: '/products' },
        { label: 'About Us', route: '/offers' },
        { label: 'Help', route: '/help' }
      ];
    }
  }
}