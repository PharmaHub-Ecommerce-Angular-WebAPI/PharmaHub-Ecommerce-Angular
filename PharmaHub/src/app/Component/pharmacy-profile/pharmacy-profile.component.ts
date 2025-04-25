import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ApiPharmacyService } from '../../services/api-pharmacy.service';
import { Iphprofile } from '../../Models/iphprofile';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pharmacy-profile',
  imports: [CommonModule, RouterModule, RouterLink , FormsModule],
  templateUrl: './pharmacy-profile.component.html',
  styleUrl: './pharmacy-profile.component.css',
})
export class PharmacyProfileComponent {

  imgUrl1: string = './logo.png';
  imgUrl2: string = './Pharmacies/1.png';
  pharmacy: Iphprofile | null = null;

  constructor(
    private apiService: ApiPharmacyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // const id = '4767c059-06eb-4a16-9d5e-d274722a408a';
    const id = localStorage.getItem('pharmacyId');
    if (id) {
      this.apiService.getPharmacyById(id).subscribe((pkg: Iphprofile) => {
        this.pharmacy = pkg;
        console.log(pkg);
       // localStorage.removeItem('pharmacyId');  // مسح الـ id بعد عرض البيانات
      });
    }
    
    // this.apiService.getPharmacyById(id).subscribe((pkg: Iphprofile) => {
    //   this.pharmacy = pkg;
    //   console.log(pkg); // تحقق من أن البيانات تصل بشكل صحيح
    // });
  }
}
