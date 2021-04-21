import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IResultatEcole, getResultatEcoleIdentifier } from '../resultat-ecole.model';

export type EntityResponseType = HttpResponse<IResultatEcole>;
export type EntityArrayResponseType = HttpResponse<IResultatEcole[]>;

@Injectable({ providedIn: 'root' })
export class ResultatEcoleService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/resultat-ecoles');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(resultatEcole: IResultatEcole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resultatEcole);
    return this.http
      .post<IResultatEcole>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(resultatEcole: IResultatEcole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resultatEcole);
    return this.http
      .put<IResultatEcole>(`${this.resourceUrl}/${getResultatEcoleIdentifier(resultatEcole) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(resultatEcole: IResultatEcole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resultatEcole);
    return this.http
      .patch<IResultatEcole>(`${this.resourceUrl}/${getResultatEcoleIdentifier(resultatEcole) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IResultatEcole>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IResultatEcole[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addResultatEcoleToCollectionIfMissing(
    resultatEcoleCollection: IResultatEcole[],
    ...resultatEcolesToCheck: (IResultatEcole | null | undefined)[]
  ): IResultatEcole[] {
    const resultatEcoles: IResultatEcole[] = resultatEcolesToCheck.filter(isPresent);
    if (resultatEcoles.length > 0) {
      const resultatEcoleCollectionIdentifiers = resultatEcoleCollection.map(
        resultatEcoleItem => getResultatEcoleIdentifier(resultatEcoleItem)!
      );
      const resultatEcolesToAdd = resultatEcoles.filter(resultatEcoleItem => {
        const resultatEcoleIdentifier = getResultatEcoleIdentifier(resultatEcoleItem);
        if (resultatEcoleIdentifier == null || resultatEcoleCollectionIdentifiers.includes(resultatEcoleIdentifier)) {
          return false;
        }
        resultatEcoleCollectionIdentifiers.push(resultatEcoleIdentifier);
        return true;
      });
      return [...resultatEcolesToAdd, ...resultatEcoleCollection];
    }
    return resultatEcoleCollection;
  }

  protected convertDateFromClient(resultatEcole: IResultatEcole): IResultatEcole {
    return Object.assign({}, resultatEcole, {
      createdDate: resultatEcole.createdDate?.isValid() ? resultatEcole.createdDate.format(DATE_FORMAT) : undefined,
      deletedDate: resultatEcole.deletedDate?.isValid() ? resultatEcole.deletedDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((resultatEcole: IResultatEcole) => {
        resultatEcole.createdDate = resultatEcole.createdDate ? dayjs(resultatEcole.createdDate) : undefined;
        resultatEcole.deletedDate = resultatEcole.deletedDate ? dayjs(resultatEcole.deletedDate) : undefined;
      });
    }
    return res;
  }
}
