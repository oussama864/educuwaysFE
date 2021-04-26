import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, ReplaySubject} from 'rxjs';
import {ApplicationConfigService} from '../core/config/application-config.service';
import {SessionStorageService} from 'ngx-webstorage';
import {StateStorageService} from '../core/auth/state-storage.service';
import {Router} from '@angular/router';
import {Account} from '../models/account.model';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Auteur} from '../models/auteur.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private authenticationStateAuteur = new ReplaySubject<Auteur | null>(1);
  private accountCache$?: Observable<Account | null>;
   userIdentityAuteur: Auteur;
  constructor(
      private sessionStorage: SessionStorageService,
      private http: HttpClient,
      private stateStorageService: StateStorageService,
      private router: Router,
      private applicationConfigService: ApplicationConfigService
  ) {}

  save(account: Account): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/account'), account);
  }

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }
  authenticateAuteur(identity: Auteur | null): void {
    this.userIdentityAuteur = identity;
    this.authenticationStateAuteur.next(this.userIdentityAuteur);
  }


  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  identity(force?: boolean): Observable<Account | null> {
    console.log('identify');
    // @ts-ignore
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
      catchError(() => of(null)),
          tap((account: Account | null) => {
            console.log('account' + account.authorities);
            if (account.authorities[0] === 'ROLE_AUTEUR'){
              this.fetchAuthorByEmail(account.email).subscribe((res) => {
                this.authenticateAuteur(res);
              });
            }
            this.authenticate(account);
            // After retrieve the account info, the language will be changed to
            // the user's preferred language configured in the account setting
           /* if (account?.langKey) {
              const langKey = this.sessionStorage.retrieve('locale') ?? account.langKey;
            }
            if (account) {
              this.navigateToStoredUrl();
            }*/
          }),
          shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.userIdentity?.imageUrl ?? '';
  }
/* 5dmt Auteur */
  private fetch(): Observable<Account> {
    return this.http.get<Account>(environment.serverUrl + '/api/account');
  }
  private fetchAuthorByEmail(email: string): Observable<Auteur> {
    return this.http.get<Auteur>(environment.serverUrl + '/api/auteurs/email/' + email);
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}
