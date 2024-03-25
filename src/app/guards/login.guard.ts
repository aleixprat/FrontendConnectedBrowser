import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard  {
  constructor(
    private router : Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) : boolean {

      const pantallaLogin =  route.data['pantallaLogin'];
      let token : string | null = localStorage.getItem('token_requests_browser');
      
      //Si es la pantalla de login debera funcionara la inversa
      if (pantallaLogin) {
        if (!token) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }

      if (!token) {
        this.router.navigate(['/login']);
        return false;
      }
      
      return true;
  }

}

