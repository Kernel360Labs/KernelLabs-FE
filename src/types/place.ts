export interface Place {
  id: number;
  thumbnailUrl: string;
  name: string;
  address: string;
}

export interface PlacesResponse {
  status: string;
  code: string;
  message: string;
  data: Place[];
}

export interface PlaceDetail {
  id: number;
  thumbnailUrl: string;
  name: string;
  address: string;
  openTime: string;
  closeTime: string;
  unitPrice: number;
  description: string;
}

export interface PlaceDetailResponse {
  status: string;
  code: string;
  message: string;
  data: PlaceDetail;
}
