export interface AttractionData {
  _id: string;
  slug: string;
  name: string;
  description: string;
  location: {
    province: object;
    district: object;
    detail: string;
  };
  rating: number;
  duration: number;
  images: string[];
  schedule: string[];
  included: string[];
  price: [number, number];
  city: string;
  cancelFree: boolean;
  numberOfTickets: {
    adult: string;
    children: string;
  };
  isTrending: boolean;
  isActive: boolean;
  unitCode: string;
  startDate: Date;
  createdAt: Date;
}
export interface CardBookingTicketProps {
  duration: number;
  price: [number, number];
  date: Date | undefined;
  hour: string;
  slug: string;
  name: string;
  numberOfTickets: {
    adult: string;
    children: string;
  };
}
export interface IBookingContainer {
  slug: string;
  data: AttractionData;
}
export interface SearchResult {
  data: AttractionData[];
}
