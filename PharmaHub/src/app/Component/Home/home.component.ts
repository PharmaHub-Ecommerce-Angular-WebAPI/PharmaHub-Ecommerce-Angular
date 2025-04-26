import {
  Component,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { FooterMarqueeComponent } from '../customer/footer-marquee/footer-marquee.component';
import { CommonModule } from '@angular/common';
import { MoveUpAnimateDirective } from '../../Directives/move-up-animate.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    FooterMarqueeComponent,
    MoveUpAnimateDirective,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    register();
  }
  currentIndex = 0;
  intervalId: any;

  testimonials = [
    {
      text: 'PharmaHub helped me grow my pharmacy online. Stock management and adding new products has never been easier!',
      name: 'Ali Hussain',
      role: 'Pharmacy Owner',
      avatar: 'https://i.pravatar.cc/100?img=12',
    },
    {
      text: 'As a customer, I love how simple it is to search for medicine and find trusted pharmacies. Highly recommend!',
      name: 'Sarah Ahmed',
      role: 'Customer',
      avatar: 'https://i.pravatar.cc/100?img=32',
    },
    {
      text: 'The platform is professional, easy to use, and their support team is always there when I need help. Great experience!',
      name: 'Mona Mohamed',
      role: 'Pharmacist',
      avatar: 'https://i.pravatar.cc/100?img=45',
    },
  ];

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
  }
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.nextTestimonial();
    }, 4000); // Slides every 4 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
