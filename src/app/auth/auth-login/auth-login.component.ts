import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
// @ts-ignore
import { AccountService } from 'app/core/auth/account.service';
import {LoginService} from '../LoginService';
import {Router} from '@angular/router';




@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;
    loginForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        rememberMe: [false],
    });

  constructor(
      private loginService: LoginService,
      private router: Router,
      private fb: FormBuilder
  ) {}



  ngOnInit(): void {
  }

  login(): void {
    this.loginService
        .login({
            // tslint:disable-next-line:no-non-null-assertion
          username: this.loginForm.get('username')!.value,
            // tslint:disable-next-line:no-non-null-assertion
          password: this.loginForm.get('password')!.value,
            // tslint:disable-next-line:no-non-null-assertion
          rememberMe: this.loginForm.get('rememberMe')!.value,
        })
        .subscribe(
            () => {
                /* console.log('success');*/
                 this.authenticationError = false;
               /*  console.log('erreur');*/
                 /*if (!this.router.getCurrentNavigation()) {
                    // There were no routing during login (eg from navigationToStoredUrl)

                  }*/
            },
            () => (this.authenticationError = true)
        );
  }
}
