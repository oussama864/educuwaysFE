import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ILocalisation} from '../models/localisation.model';
import {environment} from '../../environments/environment';


export type EntityResponseType = HttpResponse<ILocalisation>;
export type EntityArrayResponseType = HttpResponse<ILocalisation[]>;

@Injectable({ providedIn: 'root' })
export class LocalisationService {
  public resourceUrl = environment.serverUrl + 'api/localisations';
  constructor(protected http: HttpClient) {}

  create(localisation: ILocalisation): Observable<EntityResponseType> {
    return this.http.post<ILocalisation>(this.resourceUrl, localisation, { observe: 'response' });
  }

  update(localisation: ILocalisation): Observable<EntityResponseType> {
    return this.http.put<ILocalisation>(this.resourceUrl, localisation, {
      observe: 'response'});
  }

  partialUpdate(localisation: ILocalisation): Observable<EntityResponseType> {
    return this.http.patch<ILocalisation>(this.resourceUrl, localisation, {
      observe: 'response'});
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ILocalisation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<ILocalisation[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
