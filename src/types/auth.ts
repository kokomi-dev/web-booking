import { ReactNode } from "react";

export type AuthLayoutProp = {
  children: ReactNode;
};
export interface reqRegisterProp {
  firstname: string;
  lastname: string;
  email: string;
  numberPhone: string;
  password: string;
  groupId: [string];
  roles: string;
}
export interface reqLoginProp {
  email: string;
  password: string;
}

export interface reqUpdateProp {
  firstname?: string | undefined;
  lastname?: string | undefined;
  password?: string;
  passwordNew?: string;
  passwordNewConfirm?: string;
}
