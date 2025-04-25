import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PharmacyRequest {
  id: string; // Updated to match the API response
  userName: string; // Updated to match the API response
  formalPapersURL: string; // Updated to match the API response
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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.fetchPharmacyRequests();
    this.fetchMedicineRequests();
  }

  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken') || '';
    return new HttpHeaders({ Authorization: `Bearer ${authToken}` });
  }

  fetchPharmacyRequests(): void {
    this.isLoading = true;
    this.http.get<PharmacyRequest[]>('https://localhost:7290/api/admin/pharmacies/with-status', {
      headers: this.getAuthHeaders()
    })
    .subscribe({
      next: (data) => {
        this.pharmacyRequests = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load pharmacy requests';
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  fetchMedicineRequests(): void {
    this.http.get<MedicineRequest[]>('https://localhost:7290/api/Products/pending', {
      headers: this.getAuthHeaders()
    })
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
/*
  approvePharmacy(email: string): void {
    this.isLoading = true; // Start loading
    this.http.post(`https://localhost:7290/api/admin/pharmacy/approve/${email}`, {}, {
      headers: this.getAuthHeaders()
    })
    .subscribe({
      next: () => {
        this.loadPharmacyRequests(); 
      },
      error: (err) => {
        this.errorMessage = 'Failed to approve pharmacy request';
        console.error(err);
        this.isLoading = false; 
      }
    });
  }
*/

approvePharmacy(email: string): void {
  this.isLoading = true;
  this.http.post(`https://localhost:7290/api/admin/pharmacy/approve/${email}`, {}, {
    headers: this.getAuthHeaders()
  })
  .subscribe({
    next: () => {
      // Remove the approved pharmacy from the local array
      this.pharmacyRequests = this.pharmacyRequests.filter(req => req.email !== email);
      this.cdr.detectChanges(); // Force UI update
      this.isLoading = false;

      // Wait for 10 seconds and then refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    },
    error: (err) => {
      this.pharmacyRequests = this.pharmacyRequests.filter(req => req.email !== email);
      this.cdr.detectChanges(); // Force UI update
      this.isLoading = false;
    }
  });
}


rejectPharmacy(email: string): void {
  this.http.delete(`https://localhost:7290/api/admin/${email}`, {
    headers: this.getAuthHeaders()
  })
  .subscribe({
    next: () => {
      this.pharmacyRequests = this.pharmacyRequests.filter(req => req.email !== email);
      this.cdr.detectChanges(); // Add this line
    },
    error: (err) => {
      console.error('Failed to reject pharmacy', err);
    }
  });
}

  approveMedicine(id: number): void {
    this.http.post(`https://localhost:7290/api/Products/approve/${id}`, {}, {
      headers: this.getAuthHeaders()
    })
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
    this.http.delete(`https://localhost:7290/api/Products/${id}`, {
      headers: this.getAuthHeaders()
    })
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
