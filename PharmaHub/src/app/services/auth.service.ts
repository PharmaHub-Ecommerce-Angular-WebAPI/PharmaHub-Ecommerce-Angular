import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();

  constructor(private httpclient: HttpClient) {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    if (savedLoginStatus === 'true') {
      this.isLoggedInSubject.next(true);
    }
  }

  sendVerificationCode(data: any): Observable<any> {
    return this.httpclient.post(
      `${environment.baseUrl}/api/auth/send-verification-code`,
      data
    );
  }

  verifyCode(data: any): Observable<any> {
    return this.httpclient.post(
      `${environment.baseUrl}/api/auth/verify-code`,
      data,
      {
        responseType: 'text',
      }
    );
  }

  signupCustomer(data: any): Observable<any> {
    return this.httpclient.post(
      `${environment.baseUrl}/api/auth/register`,
      data,
      {
        responseType: 'text',
      }
    );
  }

  signupPharmacy(data: FormData): Observable<any> {
    return this.httpclient.post(
      `${environment.baseUrl}/api/auth/pharmacyregister`,
      data,
      {
        responseType: 'text',
      }
    );
  }
  /////////////// login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.httpclient
      .post<any>(`${environment.baseUrl}/api/auth/login`, credentials)
      .pipe(
        tap((response) => {
          const token = response.token;
          localStorage.setItem('authToken', token);

          this.isLoggedInSubject.next(true);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    // this.isLoggedInSubject.next(false);
    // localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');

    this.isLoggedInSubject.next(false);
    window.location.reload();
  }

  // isLoggedIn(): boolean {
  //   return this.isLoggedInSubject.value;
  // }
  private userRoleSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('role')
  );
  userRole$ = this.userRoleSubject.asObservable();

  setUserRole(role: string) {
    localStorage.setItem('role', role);
    this.userRoleSubject.next(role);
  }

  clearUserRole() {
    localStorage.removeItem('role');
    this.userRoleSubject.next(null);
  }
}
