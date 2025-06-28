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
