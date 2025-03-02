export default interface RecipeResponse {
  RCP_NM: string; // 레시피 이름
  RCP_PARTS_DTLS: string; // 재료 상세 정보
  RCP_PAT2: string; // 요리 종류 (예: 반찬)
  RCP_WAY2: string; // 조리 방법 (예: 굽기)
  RCP_SEQ: string; // 레시피 고유 번호
  INFO_WGT: string; // 중량 정보
  INFO_ENG: string; // 열량 (kcal)
  INFO_CAR: string; // 탄수화물 (g)
  INFO_NA: string; // 나트륨 (mg)
  INFO_PRO: string; // 단백질 (g)
  INFO_FAT: string; // 지방 (g)
  HASH_TAG: string; // 해시태그
  ATT_FILE_NO_MK?: string; // 조리 이미지 URL
  ATT_FILE_NO_MAIN: string; // 대표 이미지 URL
  MANUAL01?: string;
  MANUAL02?: string;
  MANUAL03?: string;
  MANUAL04?: string;
  MANUAL05?: string;
  MANUAL06?: string;
  MANUAL07?: string;
  MANUAL08?: string;
  MANUAL09?: string;
  MANUAL10?: string;
  MANUAL11?: string;
  MANUAL12?: string;
  MANUAL13?: string;
  MANUAL14?: string;
  MANUAL15?: string;
  MANUAL16?: string;
  MANUAL17?: string;
  MANUAL18?: string;
  MANUAL19?: string;
  MANUAL20?: string;
}
