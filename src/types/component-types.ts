import { SetStateAction } from "react";
import { AttractionData } from "./attraction.type";
import { IHotel } from "./hotel.type";

export type ModalConfirmCodeProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenModalSuccesBooking: any;
  lastName: string;
  email: string;
  code: string;
  handleSendReqBooked: ({
    paymentMethod,
    isSuccess,
  }: {
    paymentMethod: string;
    isSuccess: boolean;
  }) => void;
};
export type DisplayDoc = {
  docs: string;
};
export type InputDebounceProps = {
  value: string;
  onChange: any;
  placeholder: string;
  debounceTime?: number;
  className?: string;
  width?: number;
  type?: string;
  name?: string;
  ref?: any;
  autoFocus?: boolean;
};
export type ButtonShowPassWordProps = {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
};
export type ShowResultPropsAttraction = {
  data: AttractionData[];
  isLoading: boolean;
  nameValue: string | null;
};
export type ShowResultPropsHotel = {
  data: IHotel[];
  isLoading: boolean;
  nameValue: string | null;
};
export interface BreadcrumbItemType {
  label: string;
  href?: string;
}
export interface IconProps {
  children: React.ReactNode;
  level?: number;
  className?: string;
  tooltip?: string;
  onClick?: any;
}
export interface IVoucherProp {
  title: string;
  key: string;
  idCode: string;
  quanlity: number;
  category: string;
  description: string;
  expiryDate: string;
}
export interface IPayListWrap {
  infoBooking: any;
  totalBooking: string;
  data: AttractionData | IHotel;
  category: string;
  hour?: string | null;
  childrenNumber?: string | null;
  adult?: string | null;
  numberRoom?: string | null;
  dateTo?: string | null;
  dateFrom?: string | null;
  roomHotelBooking?: [
    {
      id: string;
      name: string;
      numberBooked: number;
    }
  ];
}
export interface IModalPayBankTransfer {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface IModalPayCreditCard {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export interface IModalBookingSucess {
  open: boolean;
  setOpen: (open: boolean) => void;
  model: string;
  handleClose: () => void;
}
export interface ItemCardProps {
  slug: string;
  name: string;
  images: string;
  location: string;
  price: number;
  route: string;
  rating: number;
}
