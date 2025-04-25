import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.development';
import { IPharmacies } from '../Models/ipharmacies';
import { Iphprofile } from '../Models/iphprofile';
import { map, Observable } from 'rxjs';
import { Ip } from '../Models/ip';

@Injectable({
  providedIn: 'root'
})
export class ApiPharmacyService {

  // private apiUrl = `${environment.baseUrl}/api/Pharmacy/Getpharmacies`;
  constructor(private httpclient: HttpClient) { 

  }

  getPharmacy() {
      return this.httpclient.get<IPharmacies[]>(`${environment.baseUrl}/api/Pharmacy/Getpharmacies`, 
      //   {
      //   params: {
      //   }
      // }
    );
    }
    getPharmacylimted() {
      return this.httpclient.get<IPharmacies[]>(`${environment.baseUrl}/api/Pharmacy/Getpharmacies`, 
        {
        params: {
          numberOfUsers : 3 
        }
      }
    );
    }
  
    getPharmacyById(id: string):Observable<Iphprofile>   {
      return this.httpclient.get<Iphprofile>(`${environment.baseUrl}/api/Pharmacy/GetPharmacyById/${id}`);
}

getSearchPharmacies(name: string): Observable<Ip[]> {
  return this.httpclient.get<any[]>(`${environment.baseUrl}/api/Products/mini-search?name=${name}`).pipe(
    map((products) => {
      // فلترة الصيدليات الفريدة
      const seen = new Set();
      const uniquePharmacies = products.filter((item) => {
        if (seen.has(item.pharmacyId)) return false;
        seen.add(item.pharmacyId);
        return true;
      }).map((item) => ({
        id: item.pharmacyId,
        pharmacyName  : item.pharmacyName,
        logoURL: item.pharmacyLogo
      }));

      return uniquePharmacies;
    })
  );
}
}
