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

export type HospitalFullData = Partial<HospitalData & HospitalDetail> & {
  detail ?: HospitalDetail
  traffic?: HospitalTraffic[];
  treatment?: HospitalTreatment[];
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
  code: number;
  code_name: string;
  num_of_doctor: number;
};

export type Symptoms = {
  id: string;
  name: string;
  image: string;
  departments: [Department,...Department[]];
};

export interface FullHospitalRes{
  length : number,
  data : HospitalData[] | null
}

export type Department =
  | '치과'
  | '직업환경의학과'
  | '예방치과'
  | '산부인과'
  | '피부과'
  | '이비인후과'
  | '한방부인과'
  | '진단검사의학과'
  | '성형외과'
  | '신경과'
  | '한방신경정신과'
  | '구강병리과'
  | '영상치의학과'
  | '사상체질과'
  | '한방내과'
  | '소아청소년과'
  | '치주과'
  | '결핵과'
  | '구강악안면외과'
  | '외과'
  | '신경외과'
  | '응급의학과'
  | '침구과'
  | '마취통증의학과'
  | '구강내과'
  | '병리과'
  | '치과보존과'
  | '정형외과'
  | '안과'
  | '비뇨의학과'
  | '정신건강의학과'
  | '한방재활의학과'
  | '소아치과'
  | '방사선종양학과'
  | '핵의학과'
  | '한방응급'
  | '치과보철과'
  | '영상의학과'
  | '가정의학과'
  | '내과'
  | '예방의학과'
  | '한방안·이비인후·피부과'
  | '치과교정과'
  | '재활의학과'
  | '심장혈관흉부외과'
  | '한방소아과'
  | '통합치의학과';
