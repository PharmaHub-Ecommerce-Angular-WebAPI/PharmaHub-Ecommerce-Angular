// // src/app/services/cache.service.ts
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class CacheService {
//   set(key: string, data: any, ttlMinutes: number = 5) {
//     const item = {
//       data,
//       expiry: new Date().getTime() + ttlMinutes * 60 * 1000
//     };
//     localStorage.setItem(key, JSON.stringify(item));
//   }

//   get(key: string): any | null {
//     const itemStr = localStorage.getItem(key);
//     if (!itemStr) return null;

//     const item = JSON.parse(itemStr);
//     const now = new Date().getTime();

//     if (now > item.expiry) {
//       localStorage.removeItem(key);
//       return null;
//     }

//     return item.data;
//   }

//   clear(key: string) {
//     localStorage.removeItem(key);
//   }
// }
// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpResponse
// } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { tap, shareReplay } from 'rxjs/operators';

// @Injectable()
// export class CacheService implements HttpInterceptor {
  
//   // استخدام localStorage بدلاً من الكاش في الذاكرة
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // لا نكاش في حال كانت الميثود POST أو PUT أو DELETE
//     if (req.method !== 'GET') {
//       return next.handle(req);
//     }

//     const cacheKey = req.urlWithParams;

//     // فحص ما إذا كانت البيانات موجودة في localStorage
//     const cachedData = localStorage.getItem(cacheKey);
//     if (cachedData) {
//       console.log(`%c[Cache] Returning cached response from localStorage for: ${cacheKey}`, 'color: green');
//       return of(new HttpResponse({ body: JSON.parse(cachedData) }));
//     }

//     // إذا لم تكن البيانات موجودة في الكاش، نطلبها من الـ API
//     return next.handle(req).pipe(
//       tap((event) => {
//         if (event instanceof HttpResponse) {
//           console.log(`%c[API] Fetched & cached in localStorage: ${cacheKey}`, 'color: orange');
//           localStorage.setItem(cacheKey, JSON.stringify(event.body));  // حفظ البيانات في localStorage
//         }
//       }),
//       shareReplay(1) // تمنع تكرار الريكوستات المتزامنة
//     );
//   }
// }
