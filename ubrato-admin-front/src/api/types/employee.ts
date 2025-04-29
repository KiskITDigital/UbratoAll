import { BaseRequest } from "./base";

export type EmployeeProps = {
  email: string;
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  // role: "user" | "employee" | "admin" | "super_admin";
  role: string;
  position: string;
};

export type Employee = EmployeeProps & {
  id: number;
  avatar_url?: string;
  email_verified: boolean;
  is_banned: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateEmployeeRequest = BaseRequest<
  undefined,
  undefined,
  EmployeeProps
>;
export type CreateEmployeeResponse = Employee;
