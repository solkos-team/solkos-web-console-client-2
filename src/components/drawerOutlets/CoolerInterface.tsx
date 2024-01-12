// Generated by https://quicktype.io

export interface CoolerInterface {
  serial_number: string;
  device_id: string;
  model_id: string;
  customer: Customer;
  zone: OperativeUnit;
  region: Region;
  operative_unit: string;
  route: Route;
  outlet_id: string;
  outlet_name: string;
  outlet_address: string;
  latitude: number;
  longitude: number;
  class: Class;
  algorithm: Algorithm;
  priority?: number;
  created_at: string;
  updated_at: string;
  notified_at: string;
  days_without_visit: string;
  days_without_visitC: string;
  status: string;
}

export enum Algorithm {
  Installed = "INSTALLED",
}

export enum Class {
  Stk = "STK",
}

export enum Customer {
  Kof = "KOF",
}

export enum OperativeUnit {
  Silao = "Silao",
}

export enum Region {
  Bajío = "Bajío",
}

export enum Route {
  Si0038 = "SI0038",
}
