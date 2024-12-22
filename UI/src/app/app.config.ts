import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';  // for HttpClient injection
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';  // Import JwtModule and JWT_OPTIONS
import { customInterceptor } from './interceptor/custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([customInterceptor])), 
    JwtHelperService ,
    JwtModule,  // Provide JwtModule directly (no forRoot or withConfig here)
    {
      provide: JWT_OPTIONS,  // Provide JWT_OPTIONS with configuration
      useValue: {
        tokenGetter: () => sessionStorage.getItem('acesstoken'),  // Retrieve token from sessionStorage
        allowedDomains: ['localhost:7100'],  // Specify your allowed API domains
        disallowedRoutes: []  // Exclude any routes that shouldn't use the token
      }
    },

  ]
};
