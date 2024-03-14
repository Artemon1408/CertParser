export interface IDropArr {
  subjects?: [];
}

export interface IDropItem {
  key?: number;
  subject?: string[] | string;
  issuer?: string[] | string;
  validFrom?: string;
  validTo?: string;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
}
