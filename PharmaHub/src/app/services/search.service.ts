import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SearchResult {
  productImageUrl: string;
  productName: string;
  productPrice: number;
  pharmacyId: string;
  pharmacyName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private simpleSearchUrl = 'https://localhost:7290/api/Products/mini-search';
  private advancedSearchUrl = 'https://localhost:7290/api/Products/search';

  constructor(private http: HttpClient) { }

  searchProducts(searchTerm: string, isAdvanced: boolean = false): Observable<SearchResult[]> {
    const url = isAdvanced ? this.advancedSearchUrl : this.simpleSearchUrl;
    
    // Create HttpParams object to properly encode the parameter
    const params = new HttpParams().set('name', searchTerm);

    return this.http.get<any[]>(url, { params }).pipe(
      map(results => this.transformResults(results))
    );
  }

  private transformResults(results: any[]): SearchResult[] {
    return results.map(item => ({
      productImageUrl: item.imageUrl,
      productName: item.name,
      productPrice: item.price,
      pharmacyId: item.pharmacyId,
      pharmacyName: item.pharmacyName
    }));
  }
}