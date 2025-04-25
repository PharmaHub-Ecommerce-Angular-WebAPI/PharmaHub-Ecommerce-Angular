// src/app/services/api-product.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.development';
import { Iproduct } from '../Models/iproduct';
// import { CacheService } from './cache.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiProductService {
  private apiUrl = `${environment.baseUrl}/api/products/featured-by-type`;

  constructor(private httpclient: HttpClient ) {}

  getPackages() {
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: 'Package' ,
        size : 12, 
        offer :false
    
      }
    });
  }

  getPackagesPHARMACY() {
    const id = localStorage.getItem('pharmacyId')as string;
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: 'Package' ,
        size : 12, 
        offer :false,
        pharmacyId : id 
      }
    });
  }
  getMedicinePHARMACY() {
    const id = localStorage.getItem('pharmacyId')as string;
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: 'Medicine' ,
        size : 12, 
        offer :false,
        pharmacyId : id 
      }
    });
  } 
   getHealthdevicePHARMACY() {
    const id = localStorage.getItem('pharmacyId')as string;
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: 'HealthDevice' ,
        size : 12, 
        offer :false,
        pharmacyId : id 
      }
    });
  }  
  getBeautyPHARMACY() {
    const id = localStorage.getItem('pharmacyId')as string;
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: 'BeautyProduct' ,
        size : 12, 
        offer :false,
        pharmacyId : id 
      }
    });
  }
    getPersonalCarePHARMACY() {
    const id = localStorage.getItem('pharmacyId')as string;
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: 'PersonalCare' ,
        size : 12, 
        offer :false,
        pharmacyId : id 
      }
    });
  }
  
  getOffers() {
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: ['Medicine' , 'BeautyProduct' , 'PersonalCare' ,'HealthDevice' ,'Others' , 'Package']  ,
        size : 12, 
        offer :true
      }
    });
  }
  
  getOffersPHARMACY() {
    const id = localStorage.getItem('pharmacyId')as string;
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: ['Medicine' , 'BeautyProduct' , 'PersonalCare' ,'HealthDevice' ,'Others' , 'Package']  ,
        size : 12, 
        offer :true ,
        pharmacyId : id 
      }
    });
  }

  getpackgeslimeted() {
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: [ 'Package']  ,
 
        offer :true
      }
    });
  }
  getmaxpricePackages() {
    return this.httpclient.get(`${environment.baseUrl}/api/Products/MaxPrice`, {
      params: {
        categories: [ 'Package']  ,
      }
    });
  }
  getmaxpriceOffers() {
    return this.httpclient.get(`${environment.baseUrl}/api/Products/MaxPrice`, {
    });
  }

  addproduct(data: FormData): Observable<any> 
  {
    
    return this.httpclient.post(`${environment.baseUrl}/api/Products`, data, {
      responseType: 'text' 
    });
  }

  getProductById(id: string): Observable<Iproduct> {
    return this.httpclient.get<Iproduct>(`${environment.baseUrl}/api/Products/Pharmacy/${id}`);
  }

  deleteProductById(id: string): Observable<Iproduct> {
    return this.httpclient.delete<Iproduct>(`${environment.baseUrl}/api/Products/${id}`);
  }

  searchMedicines(query: string): Observable<any[]> {
    return this.httpclient.get<any[]>(`${environment.baseUrl}/api/SuggestedMedicines/search?name=${query}`);
  }
  
  /////update product
  updateProduct(id: string, data: any): Observable<any> {
    return this.httpclient.put(`${environment.baseUrl}/api/Products/${id}`, data);
  }

  
  getProductDetailsById(id: string): Observable<any> {
    return this.httpclient.get(`${environment.baseUrl}/api/Products/${id}`);
  }

  /////order
  addOrder(data: any ): Observable<any> 
  {
    
    return this.httpclient.post(`${environment.baseUrl}/api/orders/create`, data)
    //   , {
    //   responseType: 'text' 
    // });
  }
}
