import { Component } from '@angular/core';
import { IPharmacies } from '../../../Models/ipharmacies';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoveUpAnimateDirective } from '../../../Directives/move-up-animate.directive';
import { FillterPHnameComponent } from '../fillter-phname/fillter-phname.component';
import { PharmNameService } from '../../../services/pharm-name.service';
@Component({
  selector: 'app-view-all-pharmacies',
  imports: [
    CommonModule,
    RouterModule,
    MoveUpAnimateDirective,
    FillterPHnameComponent,
  ],
  templateUrl: './view-all-pharmacies.component.html',
  styleUrl: './view-all-pharmacies.component.css',
})
export class ViewAllPharmaciesComponent {
  pharmacies: IPharmacies[] = [];
  filteredPharmacies: IPharmacies[] = [];
  selectedPharmName: string | null = null;

  constructor(private pharmNameService: PharmNameService) {
    this.pharmacies = [
      { id: '1', Name: 'Abdellatif Eltarshouby', imgUrl: './Pharmacies/1.png' },
      { id: '2', Name: 'Al Amir', imgUrl: './Pharmacies/2.png' },
      { id: '3', Name: 'El Ezaby', imgUrl: './Pharmacies/3.png' },
      { id: '4', Name: 'Eltarshouby', imgUrl: './Pharmacies/4.png' },
      // { id: '1', Name: 'Abdellatif Eltarshouby', imgUrl: './Pharmacies/1.png' },
      // { id: '2', Name: 'Al Amir', imgUrl: './Pharmacies/2.png' },
      // { id: '3', Name: 'El Ezaby', imgUrl: './Pharmacies/3.png' },
      // { id: '4', Name: 'Eltarshouby', imgUrl: './Pharmacies/4.png' },
      // { id: '1', Name: 'Abdellatif Eltarshouby', imgUrl: './Pharmacies/1.png' },
      // { id: '1', Name: 'Abdellatif Eltarshouby', imgUrl: './Pharmacies/1.png' },
      // { id: '1', Name: 'Abdellatif Eltarshouby', imgUrl: './Pharmacies/1.png' },
      // { id: '1', Name: 'Abdellatif Eltarshouby', imgUrl: './Pharmacies/1.png' },
    ];
    this.filteredPharmacies = this.pharmacies;
    const uniquePharmNames = [...new Set(this.pharmacies.map((p) => p.Name))];
    this.pharmNameService.setPharmNames(uniquePharmNames);
    this.pharmNameService.selectedPharmName$.subscribe((name) => {
      this.selectedPharmName = name;
      this.filterPharmacies();
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
