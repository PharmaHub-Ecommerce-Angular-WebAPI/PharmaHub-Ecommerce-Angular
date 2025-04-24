import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PharmacyRequest {
  id: number;
  name: string;
  pdfLink: string;
  email: string;
}

interface MedicineRequest {
  id: number;
  name: string;
  strength: string;
}

@Component({
  selector: 'app-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  pharmacyRequests: PharmacyRequest[] = [];
  medicineRequests: MedicineRequest[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.fetchPharmacyRequests();
    this.fetchMedicineRequests();
  }

  fetchPharmacyRequests(): void {
    this.http.get<PharmacyRequest[]>('https://localhost:7290/api/admin/pharmacis/with-status')
      .subscribe({
        next: (data) => {
          this.pharmacyRequests = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load pharmacy requests';
          this.isLoading = false;
          console.error(err);
        }
      });
  }

  fetchMedicineRequests(): void {
    this.http.get<MedicineRequest[]>('https://localhost:7290/api/Product/PendingProduct')
      .subscribe({
        next: (data) => {
          this.medicineRequests = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load medicine requests';
          this.isLoading = false;
          console.error(err);
        }
      });
  }

  approvePharmacy(email: string): void {
    this.http.post(`https://localhost:7290/api/admin/pharmacy/approve/${email}`, {})
      .subscribe({
        next: () => {
          this.pharmacyRequests = this.pharmacyRequests.filter(req => req.email !== email);
        },
        error: (err) => {
          console.error('Failed to approve pharmacy', err);
        }
      });
  }

  rejectPharmacy(email: string): void {
    this.http.post(`https://localhost:7290/api/admin/pharmacy/reject/${email}`, {})
      .subscribe({
        next: () => {
          this.pharmacyRequests = this.pharmacyRequests.filter(req => req.email !== email);
        },
        error: (err) => {
          console.error('Failed to reject pharmacy', err);
        }
      });
  }

  approveMedicine(id: number): void {
    this.http.post(`https://localhost:7290/api/Product/approve/${id}`, {})
      .subscribe({
        next: () => {
          this.medicineRequests = this.medicineRequests.filter(req => req.id !== id);
        },
        error: (err) => {
          console.error('Failed to approve medicine', err);
        }
      });
  }

  rejectMedicine(id: number): void {
    this.http.post(`https://localhost:7290/api/Product/reject/${id}`, {})
      .subscribe({
        next: () => {
          this.medicineRequests = this.medicineRequests.filter(req => req.id !== id);
        },
        error: (err) => {
          console.error('Failed to reject medicine', err);
        }
      });
  }

}
