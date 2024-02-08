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
  latitude: string;
  longitude: string;
  class: string | Class;
  algorithm: string;
  priority?: string;
  created_at: string;
  updated_at: string;
  notified_at: string;
  days_without_visit: string;
  days_without_visitC: string;
  status: string;
  num_coolers: string;
  priority_status: string;
  last_read: string;
  value: number;
  delta: number;
  level: string;
}


export interface Algorithm {
  level: string;
  class: string;
  algorithm: string;
  value: number;
  Installed :string ;
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
export interface InsightLevel {
  ALERT: {
    level: string;
    total: number;
    algorithms: Algorithm[];
  };
  FAIL: {
    level: string;
    total: number;
    algorithms: Algorithm[];
  };
  INDICATOR: {
    level: string;
    total: number;
    algorithms: Algorithm[];
  };
  summary: {
    coolers: number;
    operative_units: number;
    regions: number;
    routes: number;
    zones: number;
  };
  coolers;
  operative_units;
  regions;
  routes;
  zones;
}

export interface InsightsData {
  [key: string]: InsightLevel;
}

export interface CoolerData {
  cooler: {
    serial_number: string;
    model_id: string;
    outlet_name: string;
    customer: string;
    region: string;
    route: string;
    zone: string;
    days_without_visit: string;
    last_read: string;
    total_ownership_expense: number;
    sale_price: number;
    total_expense_service: string;
    energy_consumption: string;
    status: string;
    asset_number: string;
    channel: string;
  };
  properties: {
    description: string;
    name: string;
    value: number;
  };
  service_orders?: Array<{ description: string }>;
  tracking?: Array<{ class: string; algorithm: string; notified_at: string }>;
}