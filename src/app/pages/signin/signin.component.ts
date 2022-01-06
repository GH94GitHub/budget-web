import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { BillService } from 'src/app/shared/services/bill.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm : FormGroup = {} as FormGroup;
  msgs: Array<Message> = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sessionService: SessionService,
    private cookieService: CookieService,
    private router: Router,
    private billService: BillService) {
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
      // user is authenticated
      if (res.data.auth) {
        const token = res.data.token;
        this.cookieService.set('session_user', token, 1);

        this.router.navigate(['/']);
      }
    },
    // Signin Error
    (err) => {
      this.msgs = [{severity: 'error', summary: 'Error', detail: err.error.message}];
    })
  }
}
