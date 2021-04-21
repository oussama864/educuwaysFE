import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQcm, getQcmIdentifier } from '../qcm.model';

export type EntityResponseType = HttpResponse<IQcm>;
export type EntityArrayResponseType = HttpResponse<IQcm[]>;

@Injectable({ providedIn: 'root' })
export class QcmService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/qcms');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(qcm: IQcm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(qcm);
    return this.http
      .post<IQcm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(qcm: IQcm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(qcm);
    return this.http
      .put<IQcm>(`${this.resourceUrl}/${getQcmIdentifier(qcm) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(qcm: IQcm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(qcm);
    return this.http
      .patch<IQcm>(`${this.resourceUrl}/${getQcmIdentifier(qcm) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IQcm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IQcm[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addQcmToCollectionIfMissing(qcmCollection: IQcm[], ...qcmsToCheck: (IQcm | null | undefined)[]): IQcm[] {
    const qcms: IQcm[] = qcmsToCheck.filter(isPresent);
    if (qcms.length > 0) {
      const qcmCollectionIdentifiers = qcmCollection.map(qcmItem => getQcmIdentifier(qcmItem)!);
      const qcmsToAdd = qcms.filter(qcmItem => {
        const qcmIdentifier = getQcmIdentifier(qcmItem);
        if (qcmIdentifier == null || qcmCollectionIdentifiers.includes(qcmIdentifier)) {
          return false;
        }
        qcmCollectionIdentifiers.push(qcmIdentifier);
        return true;
      });
      return [...qcmsToAdd, ...qcmCollection];
    }
    return qcmCollection;
  }

  protected convertDateFromClient(qcm: IQcm): IQcm {
    return Object.assign({}, qcm, {
      createdDate: qcm.createdDate?.isValid() ? qcm.createdDate.format(DATE_FORMAT) : undefined,
      deletedDate: qcm.deletedDate?.isValid() ? qcm.deletedDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((qcm: IQcm) => {
        qcm.createdDate = qcm.createdDate ? dayjs(qcm.createdDate) : undefined;
        qcm.deletedDate = qcm.deletedDate ? dayjs(qcm.deletedDate) : undefined;
      });
    }
    return res;
  }
}
