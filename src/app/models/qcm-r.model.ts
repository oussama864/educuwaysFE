import {IReponse} from './reponse.model';


export interface IQcmR {
  id?: string;
  question?: string | null;
  choixParticipant?: string | null;
  reponse?: IReponse | null;
}

export class QcmR implements IQcmR {
  constructor(
    public id?: string,
    public question?: string | null,
    public choixParticipant?: string | null,
    public reponse?: IReponse | null
  ) {}
}

export function getQcmRIdentifier(qcmR: IQcmR): string | undefined {
  return qcmR.id;
}
