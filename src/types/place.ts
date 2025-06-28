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

export interface ReservationRequest {
  placeId: number;
  password: string;
  reservationDate: string;
  timeSlots: string[];
}

export interface ReservationResponse {
  status: string;
  code: string;
  message: string;
  data: {
    reservationId: number;
    placeId: number;
    placeName: string;
    reservationDate: string;
    startTime: string;
    endTime: string;
  };
}
