import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

export class AuthService {
 
    private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
    public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  
    constructor() {
      const savedLoginStatus = localStorage.getItem('isLoggedIn');
      if (savedLoginStatus === 'true') {
        this.isLoggedInSubject.next(true);
      }
    }
  
    login(): void {
      this.isLoggedInSubject.next(true);
      localStorage.setItem('isLoggedIn', 'true');
    }
  
    logout(): void {
      this.isLoggedInSubject.next(false);
      localStorage.setItem('isLoggedIn', 'false');
    }
  
    isLoggedIn(): boolean {
      return this.isLoggedInSubject.value;
    }
  }