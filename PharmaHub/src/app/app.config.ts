import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
// import { CacheService } from './services/cache.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([cacheInterceptor])) ,
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
};
