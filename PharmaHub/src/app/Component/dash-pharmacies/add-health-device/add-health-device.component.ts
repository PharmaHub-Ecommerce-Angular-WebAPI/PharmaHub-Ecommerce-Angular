import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiProductService } from '../../../services/api-product.service';
import { ProductUpdateService } from '../../../services/product-update.service';

@Component({
  selector: 'app-add-health-device',
  imports: [    FormsModule, CommonModule ],
    providers: [ApiProductService],
  templateUrl: './add-health-device.component.html',
  styleUrl: './add-health-device.component.css'
})
export class AddHealthDeviceComponent {

   constructor(private apiProductService: ApiProductService ,  private productUpdateService: ProductUpdateService) {}
  
    product = {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      strength: 0,
      category: '',
      pharmacyId: '',
      components: [] as string[],
      logoFile: null as File | null, 
    };
    previewImage: string | null = null;
    
    addComponent() {
      this.product.components.push('');
    }
    
    removeComponent(index: number) {
      this.product.components.splice(index, 1);
    }
    
   
    
    logoError: 'required' | 'invalidType' | 'tooLarge' | null = null;
    logoTouched = false;
  
    onImageSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      this.logoTouched = true;
    
      if (!input.files || input.files.length === 0) {
        this.product.logoFile = null;
        this.logoError = 'required';
        return;
      }
    
      const file = input.files[0];
      const reader = new FileReader();
    
      reader.onload = () => {
      
        this.previewImage = reader.result as string;
      };
    
      reader.readAsDataURL(file);
    
      const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    
      if (!validTypes.includes(file.type)) {
        this.product.logoFile = null;
        this.logoError = 'invalidType';
        return;
      }
    
      const maxSizeMB = 5;
      if (file.size > maxSizeMB * 1024 * 1024) {
        this.product.logoFile = null;
        this.logoError = 'tooLarge';
        return;
      }
    
      this.product.logoFile = file;
    }
    submitProduct() {
      const formData = new FormData();
      formData.append('Name', this.product.name);
      formData.append('Description', this.product.description);
      formData.append('Price', this.product.price.toString());
      formData.append('Quantity', this.product.quantity.toString());
      formData.append('Strength', '0'.toString()); 
      // formData.append('pharmacyId', this.product.pharmacyId);
      formData.append('Category', 'HealthDevice');
  
      const pharmacyId = localStorage.getItem('userId');
      if (pharmacyId) {
        formData.append('PharmacyId', pharmacyId);
      } else {
        console.warn('No pharmacyId found in localStorage');
      }
  
  
      if (this.product.logoFile) {
        formData.append('ImageUrl', this.product.logoFile, this.product.logoFile.name);
     
      }
  
     
      formData.append('Components', '');
  
  
     console.log(' Form Data:', formData);
      this.apiProductService.addproduct(formData).subscribe({
        next: res => {
          console.log('Product added successfully', res);
        this.productUpdateService.notifyProductAdded();

        },
        error: err => {
          console.error('Error adding product', err);
        }
      });
    }

}
