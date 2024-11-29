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
