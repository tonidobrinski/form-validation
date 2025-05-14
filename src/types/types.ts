import { ReactNode } from "react";

export type Step1FormData = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  interests: string[];
};

export type Step2FormData = {
  avatar: FileList;
};

export type childredProps = {
  children: ReactNode;
};
