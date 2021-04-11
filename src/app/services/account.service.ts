import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, ReplaySubject} from 'rxjs';
import {ApplicationConfigService} from '../core/config/application-config.service';
import {SessionStorageService} from 'ngx-webstorage';
import {StateStorageService} from '../core/auth/state-storage.service';
import {Router} from '@angular/router';
import {Account} from '../models/account.model';
import {catchError, shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account | null>;

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
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      this.accountCache$ = this.fetch().pipe(
      catchError(() => of(null)),
          tap((account: Account | null) => {
            this.authenticate(account);
            // After retrieve the account info, the language will be changed to
            // the user's preferred language configured in the account setting
            if (account?.langKey) {
              const langKey = this.sessionStorage.retrieve('locale') ?? account.langKey;
            }
            if (account) {
              this.navigateToStoredUrl();
            }
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

  private fetch(): Observable<Account> {
    return this.http.get<Account>(this.applicationConfigService.getEndpointFor('api/account'));
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
