import { SetStateAction } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
export type DataAddressProps = {
  full_name: string;
  full_name_en: string;
  id: string;
  latitude: string;
  longitude: string;
  name: string;
  name_en: string;
};
export type SearchAddressProps = {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  className?: string;
};
export type SearchDatePickerProps = {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  className?: string;
};
export type SearchDatePickerDouProps = {
  className?: string;
  date: DateRange | undefined;
  setDate: SelectRangeEventHandler;
};
export type SearchSelectPersonProps = {
  className?: string;
  isBooking?: boolean;
  handlePopoverChange?: (open: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
  numberAdults: number;
  numberChildren: number;
  numberRoom: number;
  numberRoomDouble?: number;
  setNumberRoomDouble?: (value: number) => void;
  setNumberAdults: (value: number) => void;
  setNumberChildren: (value: number) => void;
  setNumberRoom: (value: number) => void;
};
export type SearchContainerProp = {
  className?: string;
  currentValue?: string | null;
  variant?: string;
};

export const HIDDEN_SEARCH = ["booking", "pay"];
