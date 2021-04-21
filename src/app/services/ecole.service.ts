import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEcole, getEcoleIdentifier } from '../ecole.model';

export type EntityResponseType = HttpResponse<IEcole>;
export type EntityArrayResponseType = HttpResponse<IEcole[]>;

@Injectable({ providedIn: 'root' })
export class EcoleService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ecoles');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(ecole: IEcole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ecole);
    return this.http
      .post<IEcole>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ecole: IEcole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ecole);
    return this.http
      .put<IEcole>(`${this.resourceUrl}/${getEcoleIdentifier(ecole) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(ecole: IEcole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ecole);
    return this.http
      .patch<IEcole>(`${this.resourceUrl}/${getEcoleIdentifier(ecole) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEcole>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEcole[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEcoleToCollectionIfMissing(ecoleCollection: IEcole[], ...ecolesToCheck: (IEcole | null | undefined)[]): IEcole[] {
    const ecoles: IEcole[] = ecolesToCheck.filter(isPresent);
    if (ecoles.length > 0) {
      const ecoleCollectionIdentifiers = ecoleCollection.map(ecoleItem => getEcoleIdentifier(ecoleItem)!);
      const ecolesToAdd = ecoles.filter(ecoleItem => {
        const ecoleIdentifier = getEcoleIdentifier(ecoleItem);
        if (ecoleIdentifier == null || ecoleCollectionIdentifiers.includes(ecoleIdentifier)) {
          return false;
        }
        ecoleCollectionIdentifiers.push(ecoleIdentifier);
        return true;
      });
      return [...ecolesToAdd, ...ecoleCollection];
    }
    return ecoleCollection;
  }

  protected convertDateFromClient(ecole: IEcole): IEcole {
    return Object.assign({}, ecole, {
      createdDate: ecole.createdDate?.isValid() ? ecole.createdDate.format(DATE_FORMAT) : undefined,
      deletedDate: ecole.deletedDate?.isValid() ? ecole.deletedDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((ecole: IEcole) => {
        ecole.createdDate = ecole.createdDate ? dayjs(ecole.createdDate) : undefined;
        ecole.deletedDate = ecole.deletedDate ? dayjs(ecole.deletedDate) : undefined;
      });
    }
    return res;
  }
}
