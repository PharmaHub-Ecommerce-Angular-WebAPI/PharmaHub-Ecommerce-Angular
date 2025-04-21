import { Component, OnInit } from '@angular/core';
import { IPharmacies } from '../../../Models/ipharmacies';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { FillterPHnameComponent } from '../fillter-phname/fillter-phname.component';
import { PharmNameService } from '../../../services/pharm-name.service';
import { ApiPharmacyService } from '../../../services/api-pharmacy.service';
@Component({
  selector: 'app-view-all-pharmacies',
  imports: [
    CommonModule,
    RouterModule,
    MoveUpAnimateDirective,
    FillterPHnameComponent,
  ],
  providers: [ApiPharmacyService],
  templateUrl: './view-all-pharmacies.component.html',
  styleUrl: './view-all-pharmacies.component.css',
})
export class ViewAllPharmaciesComponent  implements OnInit {
  pharmacies: IPharmacies[] = [];
  filteredPharmacies: IPharmacies[] = [];
  selectedPharmName: string | null = null;

  constructor(private pharmNameService: PharmNameService , private apiService: ApiPharmacyService) {
   
  }

  ngOnInit(): void {
    this.apiService.getPharmacy().subscribe((response: any[]) => {
      this.pharmacies = response.map((pkg) => ({
        id: pkg.id,
        Name: pkg.pharmacyName,
        imgUrl: pkg.logoURL,

      }));
      this.filteredPharmacies = this.pharmacies;
    const uniquePharmNames = [...new Set(this.pharmacies.map((p) => p.Name))];
    this.pharmNameService.setPharmNames(uniquePharmNames);
    this.pharmNameService.selectedPharmName$.subscribe((name) => {
      this.selectedPharmName = name;
      this.filterPharmacies();
    });
    });
  }
  filterPharmacies() {
    this.filteredPharmacies = this.pharmacies.filter((pkg) => {
      const matchesPharm = this.selectedPharmName
        ? pkg.Name === this.selectedPharmName
        : true;
      return matchesPharm;
    });
  }
}
