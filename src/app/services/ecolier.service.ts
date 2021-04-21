import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEcolier, getEcolierIdentifier } from '../ecolier.model';

export type EntityResponseType = HttpResponse<IEcolier>;
export type EntityArrayResponseType = HttpResponse<IEcolier[]>;

@Injectable({ providedIn: 'root' })
export class EcolierService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ecoliers');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(ecolier: IEcolier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ecolier);
    return this.http
      .post<IEcolier>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ecolier: IEcolier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ecolier);
    return this.http
      .put<IEcolier>(`${this.resourceUrl}/${getEcolierIdentifier(ecolier) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(ecolier: IEcolier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ecolier);
    return this.http
      .patch<IEcolier>(`${this.resourceUrl}/${getEcolierIdentifier(ecolier) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEcolier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEcolier[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEcolierToCollectionIfMissing(ecolierCollection: IEcolier[], ...ecoliersToCheck: (IEcolier | null | undefined)[]): IEcolier[] {
    const ecoliers: IEcolier[] = ecoliersToCheck.filter(isPresent);
    if (ecoliers.length > 0) {
      const ecolierCollectionIdentifiers = ecolierCollection.map(ecolierItem => getEcolierIdentifier(ecolierItem)!);
      const ecoliersToAdd = ecoliers.filter(ecolierItem => {
        const ecolierIdentifier = getEcolierIdentifier(ecolierItem);
        if (ecolierIdentifier == null || ecolierCollectionIdentifiers.includes(ecolierIdentifier)) {
          return false;
        }
        ecolierCollectionIdentifiers.push(ecolierIdentifier);
        return true;
      });
      return [...ecoliersToAdd, ...ecolierCollection];
    }
    return ecolierCollection;
  }

  protected convertDateFromClient(ecolier: IEcolier): IEcolier {
    return Object.assign({}, ecolier, {
      dateDeNaissance: ecolier.dateDeNaissance?.isValid() ? ecolier.dateDeNaissance.format(DATE_FORMAT) : undefined,
      createdDate: ecolier.createdDate?.isValid() ? ecolier.createdDate.format(DATE_FORMAT) : undefined,
      deletedDate: ecolier.deletedDate?.isValid() ? ecolier.deletedDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDeNaissance = res.body.dateDeNaissance ? dayjs(res.body.dateDeNaissance) : undefined;
      res.body.createdDate = res.body.createdDate ? dayjs(res.body.createdDate) : undefined;
      res.body.deletedDate = res.body.deletedDate ? dayjs(res.body.deletedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ecolier: IEcolier) => {
        ecolier.dateDeNaissance = ecolier.dateDeNaissance ? dayjs(ecolier.dateDeNaissance) : undefined;
        ecolier.createdDate = ecolier.createdDate ? dayjs(ecolier.createdDate) : undefined;
        ecolier.deletedDate = ecolier.deletedDate ? dayjs(ecolier.deletedDate) : undefined;
      });
    }
    return res;
  }
}
