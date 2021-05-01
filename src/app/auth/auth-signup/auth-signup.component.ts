import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RegisterService} from './register.service';


@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit, AfterViewInit {

  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  authorities: string[] = [];

  registerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254),  Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'), ], ],
   lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254),  Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'), ], ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });
  registerFormEcolier = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });
  registerFormEcole = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    Nom: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254),  Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'), ], ],
    Adresse: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254),  Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'), ], ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });
  constructor(public registerService: RegisterService, private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }
  ngOnInit(): void {
    if (this.registerService.registreType === 'auteur'){
      this.authorities.push('ROLE_AUTEUR');
    } else if (this.registerService.registreType === 'ecolier'){
      this.authorities.push('ROLE_ECOLIER');
    } else if (this.registerService.registreType === 'ecole'){
      this.authorities.push('ROLE_ECOLE');
    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    // tslint:disable-next-line:no-non-null-assertion
    const password = this.registerForm.get(['password'])!.value;
    // tslint:disable-next-line:no-non-null-assertion
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      // tslint:disable-next-line:no-non-null-assertion
      const login = this.registerForm.get(['login'])!.value;
      // tslint:disable-next-line:no-non-null-assertion
      const firstName = this.registerForm.get(['firstName'])!.value;
      // tslint:disable-next-line:no-non-null-assertion
      const lastName = this.registerForm.get(['lastName'])!.value;
      // tslint:disable-next-line:no-non-null-assertion
      const email = this.registerForm.get(['email'])!.value;
      this.registerService.save({login, firstName, lastName, email, password, langKey: 'fr', authorities: this.authorities}).subscribe(
          () => (this.success = true)
      );
    }
  }
 /* registerecole(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    // tslint:disable-next-line:no-non-null-assertion
    const password = this.registerFormEcole.get(['password'])!.value;
    // tslint:disable-next-line:no-non-null-assertion
    if (password !== this.registerFormEcole.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      // tslint:disable-next-line:no-non-null-assertion
      const login = this.registerFormEcole.get(['login'])!.value;
      // tslint:disable-next-line:no-non-null-assertion
      const Nom = this.registerFormEcole.get(['Nom'])!.value;
      // tslint:disable-next-line:no-non-null-assertion
      const Adresse = this.registerFormEcole.get(['Adresse'])!.value;
      // tslint:disable-next-line:no-non-null-assertion
      const email = this.registerFormEcole.get(['email'])!.value;
      this.registerService.save({login, Nom, Adresse, email, password, langKey: 'fr', authorities: this.authorities}).subscribe(
          () => (this.success = true)
      );
    }
  }*/



}
