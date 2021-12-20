import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  signin(userName: string, password: string) : Observable<any>{
    return this.http.post('/api/session/signin', {
      userName: userName,
      password: password
    })
  };

  signout() {
    this.cookieService.delete('session_user');
    this.router.navigate(['/session/signin']);
  }


}
