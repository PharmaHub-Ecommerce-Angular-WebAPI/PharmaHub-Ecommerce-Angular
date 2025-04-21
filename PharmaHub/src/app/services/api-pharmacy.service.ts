import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment.development';
import { IPharmacies } from '../Models/ipharmacies';

@Injectable({
  providedIn: 'root'
})
export class ApiPharmacyService {

   private apiUrl = `${environment.baseUrl}/api/Pharmacy/Getpharmacies`;
  constructor(private httpclient: HttpClient) { 

  }

  getPharmacy() {
      return this.httpclient.get<IPharmacies[]>(`${this.apiUrl}`, 
      //   {
      //   params: {
      //   }
      // }
    );
    }
    getPharmacylimted() {
      return this.httpclient.get<IPharmacies[]>(`${this.apiUrl}`, 
        {
        params: {
          numberOfUsers : 3 
        }
      }
    );
    }
}
