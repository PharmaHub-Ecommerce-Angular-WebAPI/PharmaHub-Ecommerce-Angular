import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmNameService {
  private selectedPharmNameSource = new BehaviorSubject<string | null>(null);
  selectedPharmName$ = this.selectedPharmNameSource.asObservable();


  private pharmNamesSource = new BehaviorSubject<string[]>([]);
  pharmNames$ = this.pharmNamesSource.asObservable();

 
  setSelectedPharmName(name: string | null) {
    this.selectedPharmNameSource.next(name);
  }

 
  setPharmNames(names: string[]) {
    this.pharmNamesSource.next(names);
  }
}
