import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesktopGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // User is on mobile
      if (window.innerWidth <= 500 && window.innerHeight <= 900) {
        this.router.navigate(['session/mobile']);
        return false;
      }
      // User is on desktop
      else {
        return true;
      }
  }

}
