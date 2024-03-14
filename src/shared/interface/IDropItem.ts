export interface IDrop {
  name?: string[];
}

export interface IDropItem {
  subject?: string[] | string;
  issuer?: string[] | string;
  validFrom?: string;
  validTo?: string;
}
