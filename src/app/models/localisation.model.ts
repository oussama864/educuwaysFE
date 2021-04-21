export interface ILocalisation {
  id?: string;
  lat?: number | null;
  lng?: number | null;
}

export class Localisation implements ILocalisation {
  constructor(public id?: string, public lat?: number | null, public lng?: number | null) {}
}

export function getLocalisationIdentifier(localisation: ILocalisation): string | undefined {
  return localisation.id;
}
