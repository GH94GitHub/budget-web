import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {}


  signout(): void {
    this.cookieService.delete('session_user');
    this.router.navigate(['/session/signin']);
  }
}
