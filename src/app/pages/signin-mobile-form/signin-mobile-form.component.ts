import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-signin-mobile-form',
  templateUrl: './signin-mobile-form.component.html',
  styleUrls: ['./signin-mobile-form.component.scss']
})
export class SigninMobileFormComponent implements OnInit {

  signinForm : FormGroup = {} as FormGroup

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private router : Router,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  signin(): void {
    const userName = this.signinForm.controls.userName.value;
    const password = this.signinForm.controls.password.value;

    this.sessionService.signin(userName, password).subscribe( (res) => {
      // user is authenticated
      if (res.auth) {
        const token = res.token;
        this.cookieService.set('session_user', token, 1)
        this.router.navigate(['/']);
      }

    },
    (err) => {
      console.log(err);
      // TODO: Display error message from 'err' variable
    })
  }

}
