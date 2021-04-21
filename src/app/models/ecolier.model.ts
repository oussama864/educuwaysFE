import {ICompetition} from './competition.model';


export interface IEcolier {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  refUser?: string | null;
  age?: number | null;
  niveau?: string | null;
  ecole?: string | null;
  dateDeNaissance?: Date | null;
  nomParent?: string | null;
  password?: string | null;
  createdBy?: string | null;
  createdDate?: Date | null;
  deleted?: boolean | null;
  deletedBy?: string | null;
  deletedDate?: Date | null;
  competition?: ICompetition | null;
}

export class Ecolier implements IEcolier {
  constructor(
    public id?: string,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string | null,
    public refUser?: string | null,
    public age?: number | null,
    public niveau?: string | null,
    public ecole?: string | null,
    public dateDeNaissance?: Date | null,
    public nomParent?: string | null,
    public password?: string | null,
    public createdBy?: string | null,
    public createdDate?: Date | null,
    public deleted?: boolean | null,
    public deletedBy?: string | null,
    public deletedDate?: Date | null,
    public competition?: ICompetition | null
  ) {
    this.deleted = this.deleted ?? false;
  }
}

export function getEcolierIdentifier(ecolier: IEcolier): string | undefined {
  return ecolier.id;
}
