import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Shared/Footer/footer.component';
import { NavBarComponent } from './Shared/NavBar/nav-bar.component';
import { CustomerComponent } from './Component/customer/customer.component';
import { ViewAllPharmaciesComponent } from './Component/view-all-pharmacies/view-all-pharmacies.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    FooterComponent,
    CustomerComponent,
    ViewAllPharmaciesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PharmaHub';
}
