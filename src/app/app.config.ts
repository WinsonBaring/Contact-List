import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpRequest, HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

const requestInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log('Request:', request);
  return next(request);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withComponentInputBinding() ),
    provideHttpClient(withInterceptors([
      requestInterceptor
    ]))
  ]
};
