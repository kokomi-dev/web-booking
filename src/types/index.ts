export type HotelData = {
  _id: string;
  slug: string;
  name: string;
  details: string;
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
export type ShareButtonProps = {
  children?: string;
  model: string;
  slug: string;
  title: string;
};
export type CommentProps = {
  _id: string;
  idUser: string;
  content: string;
  name: string;
  nameShow: string;
  commentDate: string;
};
export type PropsGenerateMetaData = {
  params: Promise<{ slug: string }>;
};
export type ItemBookedProps = {
  index: number;
  booked: any;
  data: any;
  status: any;
};
