export interface ImageModel {
  url: string;
  alt: string;
  name: string;
  width: number;
  height: number;
}
export interface VideoModel {
  url: string;
  mime: string;
}

export interface General {
  email: string;
  rrss: RSModel[];
  addresses: AddressModel[];
}

export interface RSModel {
  platform: string;
  url: string;
}

export interface AddressModel {
  name: string;
  address: string;
  phone: string;
}
