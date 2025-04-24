import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ApiProductService } from '../../../services/api-product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductUpdateService } from '../../../services/product-update.service';

@Component({
  selector: 'app-add-pakage',
  imports: [    FormsModule, CommonModule ],
  templateUrl: './add-pakage.component.html',
  styleUrl: './add-pakage.component.css'
})
export class AddPakageComponent {
   
constructor(private apiProductService: ApiProductService , private productUpdateService: ProductUpdateService) {}

  product = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    strength: 0,
    category: '',
    pharmacyId: '',
    components: [] as string[],
    // imageFile: null as File | null,
    logoFile: null as File | null, 
  };
  previewImage: string | null = null;
  
  
  
  removeComponent(index: number) {
    this.product.components.splice(index, 1);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
  
  
  
  // onImageSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.product.imageFile = file;
  //   }
  // }
  // Handle the file change event
  // logoFile: File | null = null;
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
  

  getCleanComponents(): string[] {
    return this.product.components
      .map(comp => comp.trim()) 
      .filter((comp, index, self) => comp && self.indexOf(comp) === index); 
  }

  addComponent() {
    const last = this.product.components[this.product.components.length - 1];
    if (last === '' || last?.trim() === '') {
      alert("Please fill the previous component before adding a new one.");
      return;
    }
    this.product.components.push('');
    
  }

  
  
  submitProduct() {
    const formData = new FormData();
    formData.append('Name', this.product.name);
    formData.append('Description', this.product.description);
    formData.append('Price', this.product.price.toString());
    formData.append('Quantity', this.product.quantity.toString());
    formData.append('Strength', '0'.toString()); 
    formData.append('Category', 'Package');

    const pharmacyId = localStorage.getItem('userId');
    if (pharmacyId) {
      formData.append('PharmacyId', pharmacyId);
    } else {
      console.warn('No pharmacyId found in localStorage');
    }


    if (this.product.logoFile) {
      formData.append('ImageUrl', this.product.logoFile, this.product.logoFile.name);
      
    }

    
    const cleanComponents = this.getCleanComponents();

    cleanComponents.forEach((comp, index) => {
      formData.append(`Components[${index}]`, comp);
    });
  
    if (cleanComponents.length === 0) {
      alert("Please add at least one valid component.");
      return;
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    this.apiProductService.addproduct(formData).subscribe({
      next: res => {
        console.log('Product added successfully', res);
        this.product.name = '';
        this.product.description = '';
        this.product.price = 0;
        this.product.quantity = 0;
        this.product.logoFile = null;
        this.product.components = [''];
        this.productUpdateService.notifyProductAdded();

      },
      error: err => {
        console.error('Error adding product', err);
      }
    });
  }
  
}

