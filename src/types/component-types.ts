import { SetStateAction } from "react";
import { AttractionData, HotelData } from ".";

export type ModalConfirmCodeProps = {
  lastName: string;
  email: string;
  code: string;
  totalBooking: any;
  tripId: string;
  category: string;
  img: string;
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
  data: HotelData[];
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
}
