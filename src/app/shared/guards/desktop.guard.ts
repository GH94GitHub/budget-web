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
      console.log(`Height: ${window.innerHeight}, Width: ${window.innerWidth}.`);
      // User is on mobile
      if (window.innerWidth <= 600 && window.innerHeight <= 800) {
        this.router.navigate(['/mobile/home']);
        return false;
      }
      // User is on desktop
      else {
        console.log(`Height: ${window.innerHeight}, Width: ${window.innerWidth}.`);
        return true;
      }

    return true;
  }

}
