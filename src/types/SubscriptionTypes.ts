export interface HouseInfo {
  BSNS_MBY_NM: string; // 사업 주체명
  CNTRCT_CNCLS_BGNDE: string; // 계약 체결 시작일 (YYYY-MM-DD)
  CNTRCT_CNCLS_ENDDE: string; // 계약 체결 종료일 (YYYY-MM-DD)
  HMPG_ADRES: string; // 홈페이지 주소
  HOUSE_DTL_SECD: string; // 주택 상세 구분 코드
  HOUSE_DTL_SECD_NM: string; // 주택 상세 구분명
  HOUSE_MANAGE_NO: string; // 주택 관리 번호
  HOUSE_NM: string; // 주택명
  HOUSE_SECD: string; // 주택 구분 코드
  HOUSE_SECD_NM: string; // 주택 구분명
  HSSPLY_ADRES: string; // 공급 주소
  HSSPLY_ZIP: string; // 공급 우편번호
  MDHS_TELNO: string; // 대표 전화번호
  MVN_PREARNGE_YM: string; // 입주 예정 연월 (YYYYMM)
  PBLANC_NO: string; // 공고 번호
  PBLANC_URL: string; // 공고 상세 URL
  PRZWNER_PRESNATN_DE: string; // 당첨자 발표일 (YYYY-MM-DD)
  RCRIT_PBLANC_DE: string; // 모집 공고일 (YYYY-MM-DD)
  SEARCH_HOUSE_SECD: string; // 검색용 주택 구분 코드
  SUBSCRPT_RCEPT_BGNDE: string; // 청약 접수 시작일 (YYYY-MM-DD)
  SUBSCRPT_RCEPT_ENDDE: string; // 청약 접수 종료일 (YYYY-MM-DD)
  TOT_SUPLY_HSHLDCO: number; // 총 공급 세대 수
}
