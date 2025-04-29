import { ReactNode } from 'react';

export interface ObjectInfoT {
  name: string;
  count: number;
  image: string;
  isActive: boolean;
}

export interface CleaningTypeT {
  name: string;
  count: number;
  image: string;
  isActive: boolean;
  padding: number;
}

export interface RegisterFormValuesT {
  inn: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  middleName: string;
  lastName: string;
  userAgreement: boolean;
  personalDataPolicy: boolean;
  personalDataAgreement: boolean;
}

export interface LoginFormValuesT {
  email: string;
  password: string;
}

export interface UserInfoT {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  verified: boolean;
  is_contractor: boolean;
  created_at: string;
  avatar: string;
  organization: {
    id: string;
    short_name: string;
    inn: string;
  };
}

export interface QuestionT {
  title: string;
  textComponent: ReactNode;
}

export interface notificationT {
  msg: string;
  href: string | null;
  id: number;
  header: string;
  read: boolean;
  href_text: string;
  href_color: number;
  created_at: string;
}

export interface notificationsT {
  total: number;
  notifications: notificationT[];
}

export interface City {
  id: number;
  name: string;
  region: string;
}

export interface createTenderData {
  objects_types: number[];
  services_types: number[];
  name: string;
  price: number;
  is_contract_price: boolean;
  is_nds_price: boolean;
  floor_space: number;
  wishes: string;
  description: string;
  reception_start: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  city_id: number | null;
  attachments: string[];
}

export interface executorList {
  id: string;
  img: string;
  name: string;
  inn: string;
  text: string;
  regions: {
    id: number;
    name: string;
  }[];
  services: {
    id: number;
    name: string;
    price: number;
    group_name: string;
  }[];
  areServicesHidden: boolean;
  isFavorite: boolean;
  isTextHidden: boolean
}

export interface tenderList {
  id: string;
  img: string;
  name: string;
  inn: string;
  text: string;
  regions: {
    id: number;
    name: string;
  }[];
  services: {
    id: number;
    name: string;
    price: number;
    group_name: string;
  }[];
  areServicesHidden: boolean;
  isFavorite: boolean;
  isTextHidden: boolean
}


export interface tenderData {
  id: string;
  name: string;
  price: number;
  is_contract_price: boolean;
  is_nds_price: boolean;
  floor_space: number;
  wishes: string;
  description: string;
  reception_start: number;
  reception_end: number;
  work_start: number;
  work_end: number;
  city_id: string;
  crated_at: number;
  verified: boolean;
  status: boolean;
}






interface Organization {
  id: string;
  brand_name: string;
  short_name: string;
  inn: string;
  okpo: string;
  ogrn: string;
  kpp: string;
  avatar: string;
}

export interface Location {
  id: number;
  name: string;
}

export interface Portfolio {
  id: string;
  name: string;
  description: string;
  links: string[]
}

interface Orderer {
  description: string;
  locations: Location[];
}

export interface Service {
  id: number;
  name: string;
  price: number;
}

interface ObjectV {
  id: number;
  name: string;
}

interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  links: string[];
}

interface Executor {
  description: string;
  locations: Location[];
  services: Service[];
  objects: ObjectV[];
  portfolio: PortfolioItem[];
}

export interface OrdererProfileInfo {
  org: Organization;
  orderer: Orderer;
  isFavorite: boolean;
}

export interface ExecutorProfileInfo {
  org: Organization;
  executor: Executor;
  isFavorite: boolean;
}

export interface ErrorInfo {
  msg: string;
}