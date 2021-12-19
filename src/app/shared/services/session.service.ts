import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) {}

  signin(userName: string, password: string) : Observable<any>{
    return this.http.post('/api/session/signin', {
      userName: userName,
      password: password
    })
  }
}
