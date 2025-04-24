import { Component, OnInit } from '@angular/core';
import { ApiProductService } from '../../../services/api-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductUpdateService } from '../../../services/product-update.service';

@Component({
  selector: 'app-add-medicine',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-medicine.component.html',
  styleUrl: './add-medicine.component.css'
})
export class AddMedicineComponent implements OnInit{

  searchQuery: string = '';
  medicineNumber: number = 1;
  medicines: any[] = [];

  constructor(private apiProductService: ApiProductService , private productUpdateService: ProductUpdateService) {}

  ngOnInit(): void {
    this.medicines = []; // Start with empty array on init
  }

  searchMedicines(): void {
    if (this.searchQuery.trim().length > 0) {
      this.apiProductService.searchMedicines(this.searchQuery).subscribe(
        (data) => {
          this.medicines = data; // Populate medicines array with data from the API
        },
        (error) => {
          console.error('Error fetching medicines', error);
        }
      );
    } else {
      this.medicines = []; // Clear results if search bar is empty
    }
  }

  addMedicine(medicine: any): void {
    console.log(`Adding medicine: ${medicine.name} with quantity: ${this.medicineNumber}`);
    // Here, you can handle adding the medicine (e.g., to the cart or any other logic)
  }

  addTostock(productName: string , Strength : string): void {
    const formData = new FormData();
    
    formData.append('Name', productName);
    formData.append('Quantity', this.medicineNumber.toString()); // الكمية من الـ textbox
    formData.append('Strength', Strength);
    
    formData.append('Description', 'Drug');
    formData.append('Price', '0');
    formData.append('Category', 'Medicine');
    const pharmacyId = localStorage.getItem('userId');
    if (pharmacyId) {
      formData.append('PharmacyId', pharmacyId);
    } else {
      console.warn('No pharmacyId found in localStorage');
    }   
     formData.append('ImageUrl', '');  
    formData.append('Components', '[]'); 

    formData.forEach((value, key) => {
      console.log(key, value);
    });    
    this.apiProductService.addproduct(formData).subscribe(
      response => {
        console.log('Product added successfully:', response);
        this.productUpdateService.notifyProductAdded();

      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }



  ///////////
  name: string = '';
  strength: number = 0;
  showForm: boolean = false; 

  onSubmit(): void {
    if (this.name && this.strength >= 0) {
      const newProduct = {
        name: this.name,
        strength: this.strength
      };
      const formData = new FormData();
    
      formData.append('Name', this.name);
      formData.append('Quantity', '32000'); 
      formData.append('Strength', this.strength.toString());
      
      formData.append('Description', 'Drug');
      formData.append('Price', '0');
      formData.append('Category', 'Medicine');
      const pharmacyId = localStorage.getItem('userId');
      if (pharmacyId) {
        formData.append('PharmacyId', pharmacyId);
      } else {
        console.warn('No pharmacyId found in localStorage');
      }   
       formData.append('ImageUrl', '');  
      formData.append('Components', '[]'); 
  
      formData.forEach((value, key) => {
        console.log("hiii",key, value);

      });  
        this.apiProductService.addproduct(formData).subscribe(
        response => {
          console.log('Product send to admin:', response);
          this.productUpdateService.notifyProductAdded();
          this.resetForm(); // Reset the form after submission
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
  }
  }
  resetForm(): void {
    this.name = '';
    this.strength = 0;
    this.showForm = false; 
  }
}