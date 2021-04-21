import {IEcolier} from './ecolier.model';
import {IReponse} from './reponse.model';
import {IResultatEcole} from './resultat-ecole.model';
import {ICompetition} from './competition.model';


export interface IParticipant {
  id?: string;
  createdBy?: string | null;
  createdDate?: Date | null;
  deleted?: boolean | null;
  deletedBy?: string | null;
  deletedDate?: Date | null;
  ecolier?: IEcolier | null;
  reponse?: IReponse | null;
  resultatEcole?: IResultatEcole | null;
  competition?: ICompetition | null;
}

export class Participant implements IParticipant {
  constructor(
    public id?: string,
    public createdBy?: string | null,
    public createdDate?: Date | null,
    public deleted?: boolean | null,
    public deletedBy?: string | null,
    public deletedDate?: Date | null,
    public ecolier?: IEcolier | null,
    public reponse?: IReponse | null,
    public resultatEcole?: IResultatEcole | null,
    public competition?: ICompetition | null
  ) {
    this.deleted = this.deleted ?? false;
  }
}

export function getParticipantIdentifier(participant: IParticipant): string | undefined {
  return participant.id;
}
