export interface ZiEvidenceArea {
  number: string;
  title: string;
  description: string;
  driveUrl: string;
}

export interface PpidSection {
  id?: string;
  title: string;
  description: string;
  items: string[];
}

export interface PublicInformationPage {
  slug: string;
  title: string;
  description: string;
  category: string;
  items: string[];
  externalUrl?: string;
  documentUrl?: string;
  imageUrl?: string;
  showInformation?: boolean;
}
