import axios from "axios";

// ✅ API 기본 설정
const TOUR_API_URL = "http://apis.data.go.kr/B551011/KorService1/";
const TOUR_API_KEY = import.meta.env.VITE_TOURAPI_KEY; // 환경 변수에서 API 키 불러오기

const defaultParams = {
  MobileOS: "ETC",
  MobileApp: "TEST",
  _type: "json",
  areaCode: "1", // 서울 지역 코드
  eventStartDate: "20250101",
  eventEndDate: "20251231",
};

const districtMap = {
  "1": "종로구",
  "2": "중구",
  "3": "용산구",
  "4": "성동구",
  "5": "광진구",
  "6": "동대문구",
  "7": "중랑구",
  "8": "성북구",
  "9": "강북구",
  "10": "도봉구",
  "11": "노원구",
  "12": "은평구",
  "13": "서대문구",
  "14": "마포구",
  "15": "양천구",
  "16": "강서구",
  "17": "구로구",
  "18": "금천구",
  "19": "영등포구",
  "20": "동작구",
  "21": "관악구",
  "22": "서초구",
  "23": "강남구",
  "24": "송파구",
  "25": "강동구",
};

export default class CultureAPI {
  /**
   * 🎭 서울의 공연/전시/행사/축제 목록 조회 (모든 필드 포함)
   * @returns {Promise<object[]>} 서울의 행사 목록 반환
   */
  static async getSeoulFestivalsAndEvents() {
    try {
      console.log("🚀 API 요청 시작: 서울의 행사 목록 조회");
      
      const response = await axios.get(`${TOUR_API_URL}searchFestival1`, {
        params: {
          ...defaultParams,
          numOfRows: 100, // 한 페이지당 100개의 데이터 요청
          pageNo: 1, // 첫 번째 페이지
          serviceKey: TOUR_API_KEY,
        },
      });

      console.log("📌 API 응답 데이터:", response.data);

      // ✅ 응답 데이터 구조 검증
      if (!response.data.response || !response.data.response.body.items) {
        console.warn("⚠️ API 응답이 예상과 다름:", response.data);
        return [];
      }

      // ✅ 모든 필드를 유지하면서 변환
      const items = response.data.response.body.items.item.map((item) => ({
        content_id: item.contentid,
        content_type_id: item.contenttypeid,
        name: item.title,
        address: item.addr1,
        address_detail: item.addr2 || "",
        category1: item.cat1 || "",
        category2: item.cat2 || "",
        category3: item.cat3 || "기타",
        gu_name: districtMap[item.sigungucode] || "알 수 없음", // ✅ 시군구 코드 → 구 이름 변환
        created_time: item.createdtime,
        modified_time: item.modifiedtime,
        event_start_date: item.eventstartdate,
        event_end_date: item.eventenddate,
        latitude: item.mapy,
        longitude: item.mapx,
        map_level: item.mlevel || "",
        area_code: item.areacode,
        district_code: item.sigungucode,
        phone_number: item.tel || "",
        homepage: item.firstimage || "",
        homepage2: item.firstimage2 || "",
        copyright_div_code: item.cpyrhtDivCd || "",
        book_tour: item.booktour || "",
      }));

      console.log(`✅ 총 ${items.length}개의 데이터를 가져옴.`);
      return items;
    } catch (error) {
      console.error("❌ API 요청 오류:", error);
      return [];
    }
  }

  /**
   * 📌 특정 행사(공연/전시/축제) 상세 정보 조회
   * @param {string} contentId - 조회할 콘텐츠 ID
   * @param {string} contentTypeId - 콘텐츠 유형 ID (예: 15: 축제/행사)
   * @returns {Promise<object | null>} 상세 정보 반환 (실패 시 null)
   */
  static async getEventDetail(contentId, contentTypeId) {
    try {
      console.log(`🚀 API 요청 시작: 상세 정보 조회 (contentId: ${contentId})`);
      
      const response = await axios.get(`${TOUR_API_URL}detailCommon1`, {
        params: {
          MobileOS: "ETC",
          MobileApp: "TEST",
          _type: "json",
          contentId,
          contentTypeId,
          defaultYN: "Y",
          firstImageYN: "Y",
          areacodeYN: "Y",
          catcodeYN: "Y",
          addrinfoYN: "Y",
          mapinfoYN: "Y",
          overviewYN: "Y",
          numOfRows: 1,
          serviceKey: TOUR_API_KEY,
        },
      });
      
      console.log("📌 API 응답 데이터:", response.data);

      // ✅ 응답 데이터 구조 검증
      if (!response.data.response || !response.data.response.body.items.item) {
        console.warn("⚠️ API 응답이 예상과 다름:", response.data);
        return null;
      }
      
      const item = response.data.response.body.items.item[0];
      
      // ✅ 상세 정보 변환
      const eventDetail = {
        content_id: item.contentid,
        content_type_id: item.contenttypeid,
        name: item.title,
        created_time: item.createdtime,
        modified_time: item.modifiedtime,
        phone_number: item.tel || "",
        phone_name: item.telname || "",
        homepage: item.homepage || "",
        book_tour: item.booktour || "",
        first_image: item.firstimage || "",
        first_image2: item.firstimage2 || "",
        copyright_div_code: item.cpyrhtDivCd || "",
        area_code: item.areacode,
        district_code: item.sigungucode,
        category1: item.cat1 || "",
        category2: item.cat2 || "",
        category3: item.cat3 || "",
        address: item.addr1 || "",
        address_detail: item.addr2 || "",
        zipcode: item.zipcode || "",
        latitude: item.mapy,
        longitude: item.mapx,
        map_level: item.mlevel || "",
        overview: item.overview || "설명이 없습니다.",
      };

      console.log("✅ 상세 정보 조회 성공:", eventDetail);
      return eventDetail;
    } catch (error) {
      console.error("❌ API 요청 오류:", error);
      return null;
    }
  }
  /**
   * 📌 특정 행사(공연/전시/축제) 소개 정보 조회
   * @param {string} contentId - 조회할 콘텐츠 ID
   * @param {string} contentTypeId - 콘텐츠 유형 ID
   * @returns {Promise<object | null>} 소개 정보 반환 (실패 시 null)
   */
  static async getEventIntro(contentId, contentTypeId) {
    try {
      console.log(`🚀 API 요청 시작: 행사 소개 조회 (contentId: ${contentId})`);
      
      const response = await axios.get(`${TOUR_API_URL}detailIntro1`, {
        params: {
          MobileOS: "ETC",
          MobileApp: "TEST",
          _type: "json",
          contentId,
          contentTypeId,
          serviceKey: TOUR_API_KEY,
        },
      });
      
      console.log("📌 API 응답 데이터:", response.data);
      if (!response.data.response || !response.data.response.body.items.item) {
        console.warn("⚠️ API 응답이 예상과 다름:", response.data);
        return null;
      }
      
      const item = response.data.response.body.items.item[0];
      
      // ✅ 상세 정보 변환
      const eventIntro = {
        content_id: item.contentid,
        content_type_id: item.contenttypeid,
        sponsor1: item.sponsor1 || "",
        sponsor1_tel: item.sponsor1tel || "",
        sponsor2: item.sponsor2 || "",
        sponsor2_tel: item.sponsor2tel || "",
        event_start_date: item.eventstartdate,
        event_end_date: item.eventenddate,
        playtime: item.playtime || "",
        event_place: item.eventplace || "",
        event_homepage: item.eventhomepage || "",
        age_limit: item.agelimit || "",
        booking_place: item.bookingplace || "",
        place_info: item.placeinfo || "",
        sub_event: item.subevent || "",
        program: item.program || "",
        use_time_festival: item.usetimefestival || "",
        discount_info_festival: item.discountinfofestival || "",
        spend_time_festival: item.spendtimefestival || "",
        festival_grade: item.festivalgrade || "",
      };
      
      console.log("✅ 행사 소개 조회 성공:", eventIntro);
      return eventIntro;
    } catch (error) {
      console.error("❌ API 요청 오류:", error);
      return null;
    }
  }
  /**
   * 📌 특정 행사(공연/전시/축제) 상세 정보 조회
   * @param {string} contentId - 조회할 콘텐츠 ID
   * @param {string} contentTypeId - 콘텐츠 유형 ID
   * @returns {Promise<object | null>} 상세 정보 반환 (실패 시 null)
   */
  static async getEventInfo(contentId, contentTypeId) {
    try {
      console.log(`🚀 API 요청 시작: 행사 정보 조회 (contentId: ${contentId})`);
      
      const response = await axios.get(`${TOUR_API_URL}detailInfo1`, {
        params: {
          MobileOS: "ETC",
          MobileApp: "TEST",
          _type: "json",
          contentId,
          contentTypeId,
          serviceKey: TOUR_API_KEY,
        },
      });
      
      console.log("📌 API 응답 데이터:", response.data);
      if (!response.data.response || !response.data.response.body.items.item) {
        console.warn("⚠️ API 응답이 예상과 다름:", response.data);
        return null;
      }
      
      const items = response.data.response.body.items.item.map((item) => ({
        content_id: item.contentid,
        content_type_id: item.contenttypeid,
        serial_num: item.serialnum,
        info_name: item.infoname,
        info_text: item.infotext,
        field_category: item.fldgubun,
      }));
      
      console.log("✅ 행사 정보 조회 성공:", items);
      return items;
    } catch (error) {
      console.error("❌ API 요청 오류:", error);
      return null;
    }
  }
  /**
   * 📌 특정 행사(공연/전시/축제) 이미지 정보 조회
   * @param {string} contentId - 조회할 콘텐츠 ID
   * @returns {Promise<object[] | null>} 이미지 목록 반환 (실패 시 null)
   */
  static async getEventImages(contentId) {
    try {
      console.log(`🚀 API 요청 시작: 행사 이미지 조회 (contentId: ${contentId})`);
      
      const response = await axios.get(`${TOUR_API_URL}detailImage1`, {
        params: {
          MobileOS: "ETC",
          MobileApp: "TEST",
          _type: "json",
          contentId,
          imageYN: "Y",
          subImageYN: "Y",
          serviceKey: TOUR_API_KEY,
        },
      });
      
      console.log("📌 API 응답 데이터:", response.data);
      if (!response.data.response || !response.data.response.body.items.item) {
        console.warn("⚠️ API 응답이 예상과 다름:", response.data);
        return null;
      }
      
      const items = response.data.response.body.items.item.map((item) => ({
        content_id: item.contentid,
        original_image_url: item.originimgurl,
        small_image_url: item.smallimageurl,
        image_name: item.imgname,
        copyright_div_code: item.cpyrhtDivCd,
        serial_num: item.serialnum,
      }));
      
      console.log("✅ 행사 이미지 조회 성공:", items);
      return items;
    } catch (error) {
      console.error("❌ API 요청 오류:", error);
      return null;
    }
  }
}




