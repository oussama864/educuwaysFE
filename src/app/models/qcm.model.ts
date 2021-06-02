import {IConte} from './conte.model';
import {ICompetition} from './competition.model';


export interface IQcm {
  id?: string;
  question?: string | null;
  choixDispo?: string[] | null;
  choixCorrect?: string[] | null;
  createdBy?: string | null;
  createdDate?: Date | null;
  deleted?: boolean | null;
  deletedBy?: string | null;
  deletedDate?: Date | null;
  refcon?: IConte | null;
  competition?: ICompetition | null;
}

export class Qcm implements IQcm {
  constructor(
    public id?: string,
    public question?: string | null,
    public choixDispo?: string[] | null,
    public choixCorrect?: string[] | null,
    public createdBy?: string | null,
    public createdDate?: Date | null,
    public deleted?: boolean | null,
    public deletedBy?: string | null,
    public deletedDate?: Date | null,
    public refcon?: IConte | null,
    public competition?: ICompetition | null
  ) {
    this.deleted = this.deleted ?? false;
  }
}

export function getQcmIdentifier(qcm: IQcm): string | undefined {
  return qcm.id;
}
