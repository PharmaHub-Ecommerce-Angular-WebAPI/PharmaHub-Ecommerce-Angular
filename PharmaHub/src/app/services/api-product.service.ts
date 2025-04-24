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

  // getPackages() {
  //   const start = performance.now();
  
  //   return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
  //     params: {
  //       categories: 'Package',
  //       size: 12,
  //       offer: false
  //     }
  //   }).pipe(
  //     tap(() => {
  //       const end = performance.now();
  //       console.log(`⏱️ [API] getPackages() took ${Math.round(end - start)} ms`);
  //     })
  //   );
  // }
  

  // getPackages() {
  //   const cachedData = localStorage.getItem('packages');
  //   const cacheTime = localStorage.getItem('packages_expiry');
  
  //   const start = performance.now(); // ⏱️ بداية التوقيت
  
  //   if (cachedData && cacheTime && Date.now() < +cacheTime) {
  //     const end = performance.now(); // ⏱️ نهاية التوقيت
  //     console.log('%c[Cache] Packages loaded from cache!', 'color: green');
  //     console.log(`⏳ Loaded in ${Math.round(end - start)} ms`);
  //     return of(JSON.parse(cachedData));
  //   } else {
  //     console.log('%c[API] Fetching packages from API...', 'color: orange');
  //     return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
  //       params: {
  //         categories: 'Package',
  //         size: 12,
  //         offer: false
  //       }
  //     }).pipe(
  //       tap((data) => {
  //         const end = performance.now(); // ⏱️ نهاية التوقيت
  //         console.log(`✅ API responded in ${Math.round(end - start)} ms`);
  
  //         localStorage.setItem('packages', JSON.stringify(data));
  //         localStorage.setItem('packages_expiry', (Date.now() + 30 * 60 * 1000).toString()); // 30 دقيقة كاش
  //         console.log('%c[Cache] Packages cached for 30 minutes.', 'color: blue');
  //       })
  //     );
  //   }
  // }

  getOffers() {
    return this.httpclient.get<Iproduct[]>(`${this.apiUrl}`, {
      params: {
        categories: ['Medicine' , 'BeautyProduct' , 'PersonalCare' ,'HealthDevice' ,'Others' , 'Package']  ,
        size : 12, 
        offer :true
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
}
