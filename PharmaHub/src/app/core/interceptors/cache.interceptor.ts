import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = new Map<string, { data: any, expiry: number }>();
  const cacheDuration = 5 * 60 * 1000;
  

  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cache.get(req.urlWithParams);
  if (cachedResponse && cachedResponse.expiry > Date.now()) {
    console.log(`%c[Cache] Returning cached response for: ${req.urlWithParams}`, 'color: green');
    return cachedResponse.data.clone();
  }

  console.log(`%c[API] Fetching from API: ${req.urlWithParams}`, 'color: orange');
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        console.log(`%c[API] Caching response for: ${req.urlWithParams}`, 'color: blue');
        cache.set(req.urlWithParams, {
          data: event.clone(),
          expiry: Date.now() + cacheDuration
        });
      }
    })
  );

  
};
