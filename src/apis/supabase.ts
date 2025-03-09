import type {MapData} from '@/types/kakao.d';
import type {
  FullHospitalRes,
  HospitalData,
  HospitalDetail,
  HospitalTraffic,
  HospitalTreatment,
} from '@/types/hospitalType';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import Papa from 'papaparse'; // PapaParse 라이브러리 사용
import symptomsList from '@/assets/data/symptoms.json';

type HospitalFullData = Partial<HospitalData & HospitalDetail> & {
  traffic?: HospitalTraffic[];
  treatment?: HospitalTreatment[];
};
export default class Supabase {
  private static supabase: SupabaseClient | null = null;
  private static init() {
    if (!this.supabase) {
      const supabaseUrl = 'https://zqfwjbrqtcmjyijyxpon.supabase.co';
      const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

      if (!supabaseKey) return;

      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
    return this.supabase;
  }
  static async addCSVData(file: File | null, csvType: string | null = 'hospital') {
    let validHospitalIds = undefined;
    let record: any;

    const supabase = this.init();
    if (!supabase) return;
    if (!file) return;

    if (csvType !== 'hospital') {
      // 병원 ID 가져오기
      const {data: hospitals, error: hospitalError} = await supabase.from('hospital').select('id');
      if (hospitalError) {
        console.error('Error fetching hospital data:', hospitalError.message);
        return;
      }
      validHospitalIds = new Set(hospitals?.map((hospital: {id: string}) => String(hospital.id)));
      console.log('전체 hospital table 개수 : ', hospitals.length);
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        console.log('파일 리딩을 시작합니다.');
        const csvData = reader.result as string;
        console.log('CSV 파일 로드 완료, 데이터 파싱 시작...');

        const records: any[] = [];
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: async (results) => {
            console.log(`CSV 데이터 로드 완료 (총 ${results.data.length}개)`);

            results.data.forEach((row: any) => {
              if (csvType == 'hospital') {
                if (row.dong && row.mapx && row.mapy) {
                  records.push({
                    id: row.id,
                    name: row.name,
                    type: row.type,
                    gu_code: row.gu_code,
                    gu_name: row.gu_name,
                    dong: row.dong,
                    post_num: row.post_num,
                    addr: row.addr,
                    tel: row.tel,
                    homepage: row.homepage,
                    open_date: row.open_date,
                    mapx: row.mapx,
                    mapy: row.mapy,
                  });
                }
              } else if (csvType == 'hospital_detail' && validHospitalIds) {
                if (validHospitalIds.has(String(row.id))) {
                  records.push({
                    id: row.id,
                    location_place: row.location_place,
                    location_direction: row.location_direction,
                    location_distance: row.location_distance,
                    parking_capacity: row.parking_capacity,
                    parking_cost: row.parking_cost,
                    parking_etc: row.parking_etc,
                    closed_sun: row.closed_sun,
                    closed_holiday: row.closed_holiday,
                    emergency_day: row.emergency_day,
                    emergency_day_call1: row.emergency_day_call1,
                    emergency_day_call2: row.emergency_day_call2,
                    emergency_night: row.emergency_night,
                    emergency_night_call1: row.emergency_night_call1,
                    emergency_night_call2: row.emergency_night_call2,
                    lunchbreak_weekday: row.lunchbreak_weekday,
                    lunchbreak_sat: row.lunchbreak_sat,
                    reception_weekday: row.reception_weekday,
                    reception_sat: row.reception_sat,
                    opentime_sun: row.opentime_sun,
                    closetime_sun: row.closetime_sun,
                    opentime_mon: row.opentime_mon,
                    closetime_mon: row.closetime_mon,
                    opentime_tue: row.opentime_tue,
                    closetime_tue: row.closetime_tue,
                    opentime_wed: row.opentime_wed,
                    closetime_wed: row.closetime_wed,
                    opentime_thu: row.opentime_thu,
                    closetime_thu: row.closetime_thu,
                    opentime_fri: row.opentime_fri,
                    closetime_fri: row.closetime_fri,
                    opentime_sat: row.opentime_sat,
                    closetime_sat: row.closetime_sat,
                  });
                }
              } else if (csvType == 'hospital_traffic' && validHospitalIds) {
                if (validHospitalIds.has(String(row.id))) {
                  records.push({
                    id: row.id,
                    traffic_type: row.traffic_type,
                    line_num: row.line_num,
                    drop_point: row.drop_point,
                    direction: row.direction,
                    distance: row.distance,
                    etc: row.etc,
                  });
                }
              } else if (csvType == 'hospital_treatment' && validHospitalIds) {
                if (validHospitalIds.has(String(row.id))) {
                  records.push({
                    id: row.id,
                    code: row.code,
                    code_name: row.code_name,
                    num_of_doctor: row.num_of_doctor,
                  });
                }
              }
            });

            console.log(`유효한 레코드 수: ${records.length}개`);
            if (records.length === 0) {
              console.warn('삽입할 데이터가 없습니다.');
              return;
            }
            const batchSize = 1000;
            for (let i = 0; i < records.length; i += batchSize) {
              const batch = records.slice(i, i + batchSize);
              console.log(`데이터 업로드 중 (${i + 1} ~ ${i + batch.length}번째)...`);
              if (!csvType) return;
              const {data, error} = await supabase.from(csvType).upsert(batch);
              if (error) {
                console.error(
                  `Error inserting batch (${i + 1} ~ ${i + batch.length}):`,
                  error.message,
                );
                continue; // 다음 배치로 진행
              } else {
                console.log(`Batch ${i + 1} ~ ${i + batch.length} 업로드 성공`);
              }
            }

            console.log('모든 데이터 업로드 완료!');
          },
        });
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsText(file);
  }
  static async getFullHospitalSearchData(
    searchKeyword: string,
    page: number,
  ): Promise<FullHospitalRes> {
    const supabase = this.init();
    if (!supabase) return {length: 0, data: null};

    if (page < 1) page = 1; //1부터 시작

    const dbQuery = supabase
      .from('hospital')
      .select(
        '*, hospital_detail(opentime_sun,closetime_sun,opentime_mon,closetime_mon,opentime_tue,closetime_tue,opentime_wed,closetime_wed,opentime_thu,closetime_thu,opentime_fri,closetime_fri,opentime_sat,closetime_sat)',
        {count: 'exact'},
      );

    const {count: totalCount} = await dbQuery;

    if (!totalCount || totalCount < 1) {
      return {length: 0, data: null};
    }

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    let end = start + pageSize - 1;
    end = Math.min(end, totalCount - 1);

    if (searchKeyword) {
      dbQuery.ilike('name', `%${searchKeyword}%`);
    }

    const {data: hospitals, count, error} = await dbQuery.range(start, end);
    if (error || !count) {
      console.log('DB error : ', error);
      return {length: 0, data: null};
    }
    return {length: count, data: hospitals};
  }
  static async getFullHospitalData(
    location: MapData,
    page: number,
    hospitalType?: string,
    symptomsQuery?: string[],
  ): Promise<FullHospitalRes> {
    const supabase = this.init();
    if (!supabase) return {length: 0, data: null};

    if (page < 1) page = 1; //1부터 시작

    //기본 쿼리
    console.log('🔎 Supabase 검색 시작 ')
    console.log('위치 기준 : ', location.bounds);
    console.log('병원 타입 : ', hospitalType);
    console.log('증상 정보 : ', symptomsQuery);

    const dbQuery = supabase
      .from('hospital')
      .select(
        '*, hospital_detail(opentime_sun,closetime_sun,opentime_mon,closetime_mon,opentime_tue,closetime_tue,opentime_wed,closetime_wed,opentime_thu,closetime_thu,opentime_fri,closetime_fri,opentime_sat,closetime_sat), hospital_treatment!inner(code_name)',
        {count: 'exact'},
      )
      .gte('mapx', location.bounds.left)
      .lte('mapx', location.bounds.right)
      .lte('mapy', location.bounds.top)
      .gte('mapy', location.bounds.bottom);

    //기타 조건부 쿼리들
    if (hospitalType) {
      if(hospitalType == '치과'){
      dbQuery.ilike('type', "%치과%");
      }else{
      dbQuery.eq('type', hospitalType);
      }
    }

    const {count: totalCount} = await dbQuery;

    if (!totalCount || totalCount < 1) {
      return {length: 0, data: null};
    }

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    let end = start + pageSize - 1;
    end = Math.min(end, totalCount - 1);

    //데이터 타입 한 번 더 거르기
    if (symptomsQuery && symptomsQuery.length > 0) {
      const korList = new Set<string>();
      const findList = symptomsQuery
        .map((query) => symptomsList.find((symptom) => symptom.id === query)?.departments)
        .flat();
      findList.forEach((f) => {
        if (f) {
          korList.add(f);
        }
      });
      dbQuery.in('hospital_treatment.code_name', Array.from(korList));
    }

    const {data: hospitals, count, error} = await dbQuery.range(start, end);
    if (error || !count) {
      console.log('DB error : ', error);
      return {length: 0, data: null};
    }
    return {length: count, data: hospitals};
  }
  static async getDetailHospitalData(id: string): Promise<HospitalFullData | null> {
    try {
      //supabase load
      const supabase = this.init();
      if (!supabase) return null;

      let totalData: HospitalFullData = {};

      //기본 데이터 불러오기
      const {data: hospitalTotal, error: totalError} = await supabase
        .from('hospital')
        .select('*')
        .eq('id', id)
        .single();
      if (totalError) return null;
      totalData = {...hospitalTotal};

      //디테일 데이터 불러오기
      const {data: hospitalDetail, error: detailError} = await supabase
        .from('hospital_detail')
        .select('*')
        .eq('id', id)
        .single();
      if (!detailError && hospitalDetail) {
        totalData = {...totalData, ...hospitalDetail};
      }

      //교통 정보 불러오기
      const {data: hospitalTraffic, error: trafficError} = await supabase
        .from('hospital_traffic')
        .select('traffic_type, line_num, drop_point, direction, distance, etc')
        .eq('id', id);
      if (!trafficError && hospitalTraffic) {
        totalData = {...totalData, traffic: hospitalTraffic};
      }

      //진료과목 정보 불러오기
      const {data: hospitalTreatment, error: treatmentError} = await supabase
        .from('hospital_treatment')
        .select('code, code_name, num_of_doctor')
        .eq('id', id);
      if (!treatmentError && hospitalTreatment) {
        totalData = {...totalData, treatment: hospitalTreatment};
      }

      return totalData;
    } catch (err) {
      console.log('DB error : ', err);
      return null;
    }
  }
}
