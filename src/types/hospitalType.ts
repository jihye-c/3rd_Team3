export type HospitalData = {
  id: string;
  name: string;
  type: string;
  gu_code: number;
  gu_name: string;
  dong: string;
  post_num: number;
  addr: string;
  tel: string | null;
  homepage: string | null;
  open_date: string | null;
  mapx: number;
  mapy: number;
};

export type HospitalDetail = {
  id: string;
  location_place: string | null;
  location_direction: string | null;
  location_distance: string | null;
  parking_capacity: string | null;
  parking_cost: string | null;
  parking_etc: string | null;
  closed_sun: string | null;
  closed_holiday: string | null;
  emergency_day: string | null;
  emergency_day_call1: string | null;
  emergency_day_call2: string | null;
  emergency_night: string | null;
  emergency_night_call1: string | null;
  emergency_night_call2: string | null;
  lunchbreak_weekday: string | null;
  lunchbreak_sat: string | null;
  reception_weekday: string | null;
  reception_sat: string | null;
  opentime_sun: string | null;
  closetime_sun: string | null;
  opentime_mon: string | null;
  closetime_mon: string | null;
  opentime_tue: string | null;
  closetime_tue: string | null;
  opentime_wed: string | null;
  closetime_wed: string | null;
  opentime_thu: string | null;
  closetime_thu: string | null;
  opentime_fri: string | null;
  closetime_fri: string | null;
  opentime_sat: string | null;
  closetime_sat: string | null;
};

export type HospitalTraffic = {
  traffic_type: string;
  line_num: string | null;
  drop_point: string | null;
  direction: string | null;
  distance: string | null;
  etc: string | null;
};

export type HospitalTreatment = {
  code : number,
  code_name : string,
  num_of_doctor : number,
}