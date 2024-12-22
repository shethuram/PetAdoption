import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('acesstoken');
  const router = inject(Router); // Inject the Angular Router for navigation

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`, // Adding token to the header
    },
  });

  return next(clonedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {

        alert('unauthorized acess,login again');
        sessionStorage.clear() ;                         // Redirect to login page on 401 Unauthorized
        router.navigate(['/firstpage']);

      }
      return throwError(() => error); // Re-throw the error for other handlers
    })
  );
};

