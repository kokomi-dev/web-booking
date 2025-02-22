export type IHotel = {
  unitCode: string;
  _id: string;
  slug: string;
  name: string;
  details: string;
  startDate?: Date;
  location: {
    detail: string;
    province_id: string;
    district_id: string;
    commun_id: string;
  };
  listRooms: [
    {
      name: string;
      numberPeople: number;
      details: string[];
      price: number;
      sale: number;
      isAddchildren: boolean;
      _id: string;
    }
  ];
  rating: number;
  images: string[];
  city: string;
  type: number;
  highlights: [string];
  includes: [string];
  comments: [{}];
  cancelFree: boolean;
};
export interface IHotelRoom {
  _id: string;
  name: string;
  details: string[];
  price: number;
  sale: number;
  isAddChildren: boolean;
  numberPeople: number;
  numberBooked: number;
  numberOfRoom: number;
}
export interface InfoProps {
  name: string;
  location: string;
  details: [string];
  rating: number;
  images: any;
  slug: string;
}
