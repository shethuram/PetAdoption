import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private router:Router, private jwtHelper: JwtHelperService)
  {}
  
  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    const token = sessionStorage.getItem("acesstoken");
    const expectedRole = route.data['role'];
    
   
    if (token && !this.jwtHelper.isTokenExpired(token))
    {
        const decodedToken = this.jwtHelper.decodeToken(token);
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if(expectedRole === role)
            return true; 
    }

    console.log("guard is activated")
    
    this.router.navigate(['/firstpage']);

    return false;
    
   
  }
  
}