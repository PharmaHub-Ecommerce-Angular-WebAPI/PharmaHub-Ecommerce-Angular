import { Component, OnInit } from '@angular/core';
import { IPharmacies } from '../../../Models/ipharmacies';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { ApiPharmacyService } from '../../../services/api-pharmacy.service';

@Component({
  selector: 'app-pharmacies',
  imports: [CommonModule, RouterModule, MoveUpAnimateDirective],
  providers: [ApiPharmacyService],
  templateUrl: './pharmacies.component.html',
  styleUrl: './pharmacies.component.css',
})
export class PharmaciesComponent implements OnInit {
  pharmacies: IPharmacies[] = [];

  constructor(private apiService: ApiPharmacyService) {
 
  }
  ngOnInit(): void {
    this.apiService.getPharmacylimted().subscribe((response: any[]) => {
      this.pharmacies = response.map((pkg) => ({
        id: pkg.id,
        Name: pkg.pharmacyName,
        imgUrl: pkg.logoURL,
       
      }));
    });
  }

}
