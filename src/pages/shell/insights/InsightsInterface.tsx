export interface Algorithm {
    level: string;
    class: string;
    algorithm: string;
    value: number;
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