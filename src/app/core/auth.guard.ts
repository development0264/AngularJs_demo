/**
 * @author Swaminathan Mathivanan <swami@netalytics.com>
 */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if((atob(localStorage.getItem('authenticated')) != "true") && (atob(localStorage.getItem('toke')))){
      localStorage.clear();
      this.router.navigate(['/']);
    }
    return true;
  }


}
