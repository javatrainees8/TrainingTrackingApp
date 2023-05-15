import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from './loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginservice:LoginserviceService,private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginservice.isLoggedIn()) {
      const requiredRole = route.data['role'];
      if (requiredRole === 'admin' && this.loginservice.isAdmin()) {
        return true;
      } else if (requiredRole === 'teacher' && this.loginservice.isTeacher()) {
        return true;
      } else {
        //  is not authorized to access the route
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // User is not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}








  


