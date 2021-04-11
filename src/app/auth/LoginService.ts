import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// @ts-ignore
import {Login} from './auth-login/login.model';
import {AccountService} from '../services/account.service';
import {Account} from './account.models';
import {AuthServerProvider} from '../core/auth/auth-jwt.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    loginType = 'auteur';
    constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}

    login(credentials: Login): Observable<Account | null> {
        return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
    }

    logout(): void {
        this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
    }
}
