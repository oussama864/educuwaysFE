import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import {getConteIdentifier, IConte} from './conte.model';
import {DATE_FORMAT} from '../../../config/input.constants';
import {createRequestOption} from '../../request/request-util';
import {isPresent} from '../../util/operators';
import {environment} from '../../../../environments/environment';


export type EntityResponseType = HttpResponse<IConte>;
export type EntityArrayResponseType = HttpResponse<IConte[]>;

@Injectable({ providedIn: 'root' })
export class ConteService {
  public resourceUrl = environment.serverUrl + '/api/conte';

  constructor(protected http: HttpClient) {}

  create(conte: IConte): Observable<EntityResponseType> {
    return this.http
      .post<IConte>(this.resourceUrl + '/ajout', conte, { observe: 'response' });
  }
  createConteWithImage(formData: FormData): Observable<EntityResponseType> {
    return this.http
        .post<IConte>(this.resourceUrl + '/ajouter_conte', formData, { observe: 'response' });
  }
  getMyContes(emailAuteur: string): Observable<EntityArrayResponseType>{
    return this.http
        .get<IConte[]>(this.resourceUrl + '/all-contes/' + emailAuteur, { observe: 'response' });
  }


  update(conte: IConte): Observable<EntityResponseType> {
    return this.http
      .put<IConte>(`${this.resourceUrl}/${getConteIdentifier(conte) as string}`, conte, { observe: 'response' });
  }

  partialUpdate(conte: IConte): Observable<EntityResponseType> {
    return this.http
      .patch<IConte>(`${this.resourceUrl}/${getConteIdentifier(conte) as string}`, conte, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IConte>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IConte[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addConteToCollectionIfMissing(conteCollection: IConte[], ...contesToCheck: (IConte | null | undefined)[]): IConte[] {
    const contes: IConte[] = contesToCheck.filter(isPresent);
    if (contes.length > 0) {
      // tslint:disable-next-line:no-non-null-assertion
      const conteCollectionIdentifiers = conteCollection.map(conteItem => getConteIdentifier(conteItem)!);
      const contesToAdd = contes.filter(conteItem => {
        const conteIdentifier = getConteIdentifier(conteItem);
        if (conteIdentifier == null || conteCollectionIdentifiers.includes(conteIdentifier)) {
          return false;
        }
        conteCollectionIdentifiers.push(conteIdentifier);
        return true;
      });
      return [...contesToAdd, ...conteCollection];
    }
    return conteCollection;
  }


}
