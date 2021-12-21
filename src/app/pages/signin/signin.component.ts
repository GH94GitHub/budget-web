import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm : FormGroup = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sessionService: SessionService,
    private cookieService: CookieService,
    private router: Router) {
  }

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
      console.log('-- result --');
      console.log(res);

      // user is authenticated
      if (res.data.auth) {
        const token = res.data.token;
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
