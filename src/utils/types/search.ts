import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { Dispatch, SetStateAction } from "react";
export const HIDDEN_SEARCH = ["booking", "pay"];
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
export type SearchAddressSMProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  valueSearch: string;
  setValueSearch: Dispatch<SetStateAction<string>>;
  open2: boolean;
  setOpen2: Dispatch<SetStateAction<boolean>>;
  data: DataAddressProps[];
  error: any;
};
export type SearchAddressLGProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  valueSearch: string;
  setValueSearch: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: DataAddressProps[];
  error: any;
  inputRef: any;
  className: string | undefined;
};
export type SearchDatePickerSMProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  className?: string;
  disablePastDates: any;
};
export type SearchDatePickerLGProps = {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  className?: string;
  disablePastDates: any;
};
export type SearchDatePickerDouSMProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  className?: string;
  date: DateRange | undefined;
  setDate: SelectRangeEventHandler;
};
export type SearchDatePickerDouLGProps = {
  className?: string;
  date: DateRange | undefined;
  setDate: SelectRangeEventHandler;
};
export type SearchSelectPersonSMProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  className?: string | undefined;
  error: boolean;
  numberAdults: number;
  numberChildren: number;
  numberRoom: number;
  setNumberAdults: (value: number) => void;
  setNumberChildren: (value: number) => void;
  setNumberRoom: (value: number) => void;
  handleIncrease: any;
  handleDecrease: any;
};
export type SearchSelectPersonLGProps = {
  className?: string | undefined;
  error: boolean;
  numberAdults: number;
  numberChildren: number;
  numberRoom: number;
  setNumberAdults: (value: number) => void;
  setNumberChildren: (value: number) => void;
  setNumberRoom: (value: number) => void;
  handleIncrease: any;
  handleDecrease: any;
};
