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
    adult: number;
    children: number;
  };
  isTrending: boolean;
  isActive: boolean;
  unitCode: string;
  startDate: Date;
  createdAt: Date;
  discount: number;
}
export interface CardBookingTicketProps {
  isLoading: boolean;
  duration: number;
  price: [number, number];
  date: Date | undefined;
  hour: string;
  slug: string;
  name: string;
  numberOfTickets: {
    adult: number;
    children: number;
  };
}
export interface IBookingContainer {
  slug: string;
  data: AttractionData;
}
export interface SearchResult {
  data: AttractionData[];
}
export interface IBookedItem {
  infoAttraction: {
    name: string;
    address: string;
  };
  infoUser: {
    email: string;
  };
  paymentMethod: string;
  numberOfTicketsBooked: {
    adult: string;
    children: string;
  };
  dateStart: Date;
  bookedDate: Date;
  isSuccess: boolean;
  totalBooked: any;
}
