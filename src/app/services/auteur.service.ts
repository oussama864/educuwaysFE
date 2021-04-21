import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAuteur, getAuteurIdentifier } from '../auteur.model';

export type EntityResponseType = HttpResponse<IAuteur>;
export type EntityArrayResponseType = HttpResponse<IAuteur[]>;

@Injectable({ providedIn: 'root' })
export class AuteurService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/auteurs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(auteur: IAuteur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(auteur);
    return this.http
      .post<IAuteur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(auteur: IAuteur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(auteur);
    return this.http
      .put<IAuteur>(`${this.resourceUrl}/${getAuteurIdentifier(auteur) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(auteur: IAuteur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(auteur);
    return this.http
      .patch<IAuteur>(`${this.resourceUrl}/${getAuteurIdentifier(auteur) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IAuteur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAuteur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAuteurToCollectionIfMissing(auteurCollection: IAuteur[], ...auteursToCheck: (IAuteur | null | undefined)[]): IAuteur[] {
    const auteurs: IAuteur[] = auteursToCheck.filter(isPresent);
    if (auteurs.length > 0) {
      const auteurCollectionIdentifiers = auteurCollection.map(auteurItem => getAuteurIdentifier(auteurItem)!);
      const auteursToAdd = auteurs.filter(auteurItem => {
        const auteurIdentifier = getAuteurIdentifier(auteurItem);
        if (auteurIdentifier == null || auteurCollectionIdentifiers.includes(auteurIdentifier)) {
          return false;
        }
        auteurCollectionIdentifiers.push(auteurIdentifier);
        return true;
      });
      return [...auteursToAdd, ...auteurCollection];
    }
    return auteurCollection;
  }

  protected convertDateFromClient(auteur: IAuteur): IAuteur {
    return Object.assign({}, auteur, {
      createdDate: auteur.createdDate?.isValid() ? auteur.createdDate.format(DATE_FORMAT) : undefined,
      deletedDate: auteur.deletedDate?.isValid() ? auteur.deletedDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? dayjs(res.body.createdDate) : undefined;
      res.body.deletedDate = res.body.deletedDate ? dayjs(res.body.deletedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((auteur: IAuteur) => {
        auteur.createdDate = auteur.createdDate ? dayjs(auteur.createdDate) : undefined;
        auteur.deletedDate = auteur.deletedDate ? dayjs(auteur.deletedDate) : undefined;
      });
    }
    return res;
  }
}
