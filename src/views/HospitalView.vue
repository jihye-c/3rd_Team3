<script setup lang="ts">
  import ClinicIcon from '@/assets/icons/clinic.svg';
  import TertiaryHospitalIcon from '@/assets/icons/tertiaryHospital.svg';
  import GeneralHospitalIcon from '@/assets/icons/generalHospital.svg';
  import HospitalIcon from '@/assets/icons/hospital.svg';
  import PublicHealthCenterIcon from '@/assets/icons/publicHealthCenter.svg';
  import OrientalMedicineClinicIcon from '@/assets/icons/orientalMedicineClinic.svg';
  import DentalClinicIcon from '@/assets/icons/dentalClinic.svg';

  // 아이콘 데이터 배열 정의
  const hospitalIcons = [
    {component: ClinicIcon, name: '동네 병원 (의원)'},
    {component: TertiaryHospitalIcon, name: '상급종합'},
    {component: GeneralHospitalIcon, name: '종합병원'},
    {component: HospitalIcon, name: '병원'},
    {component: PublicHealthCenterIcon, name: '보건기관'},
    {component: OrientalMedicineClinicIcon, name: '한의원'},
    {component: DentalClinicIcon, name: '치과'},
  ];

  // 지역 리스트
  const districts = [
    {
      gu: '강남구',
      dong: [
        '역삼동',
        '선릉동',
        '삼성동',
        '청담동',
        '개포동',
        '일원동',
        '대치동',
        '도곡동',
        '논현동',
        '신사동',
      ],
    },
    {
      gu: '강동구',
      dong: [
        '천호동',
        '강일동',
        '길동',
        '명일동',
        '상일동',
        '둔촌동',
        '암사동',
        '성내동',
        '구천면로',
        '고덕동',
      ],
    },
    {
      gu: '강서구',
      dong: [
        '화곡동',
        '등촌동',
        '가양동',
        '염창동',
        '오쇠동',
        '공항동',
        '내발산동',
        '외발산동',
        '방화동',
        '구의동',
      ],
    },
    {
      gu: '관악구',
      dong: [
        '신림동',
        '봉천동',
        '서울대입구동',
        '난향동',
        '조원동',
        '신사동',
        '남현동',
        '청림동',
        '성현동',
        '관악로',
      ],
    },
    {
      gu: '광진구',
      dong: [
        '자양동',
        '구의동',
        '광장동',
        '군자동',
        '화양동',
        '능동',
        '중곡동',
        '선동',
        '회기동',
        '길동',
      ],
    },
    {
      gu: '구로구',
      dong: [
        '구로동',
        '신도림동',
        '고척동',
        '온수동',
        '오류동',
        '개봉동',
        '궁동',
        '천왕동',
        '독산동',
        '연동',
      ],
    },
    {
      gu: '금천구',
      dong: [
        '가산동',
        '독산동',
        '시흥동',
        '금천로',
        '안양천',
        '이마트',
        '대양',
        '시흥동',
        '연주동',
      ],
    },
    {
      gu: '동대문구',
      dong: [
        '청량리동',
        '회기동',
        '용두동',
        '전농동',
        '이문동',
        '답십리동',
        '장안동',
        '신설동',
        '묵동',
        '용답동',
      ],
    },
    {
      gu: '동작구',
      dong: [
        '노량진동',
        '대방동',
        '상도동',
        '흑석동',
        '사당동',
        '관악로',
        '삼성동',
        '신대방동',
        '상도2동',
        '원효로',
      ],
    },
    {
      gu: '마포구',
      dong: [
        '합정동',
        '상수동',
        '망원동',
        '아현동',
        '대흥동',
        '용강동',
        '신수동',
        '서교동',
        '창전동',
        '토정동',
      ],
    },
    {
      gu: '성동구',
      dong: [
        '성수동',
        '송정동',
        '금호동',
        '하왕십리동',
        '마장동',
        '왕십리',
        '답십리동',
        '옥수동',
        '청담동',
        '용답동',
      ],
    },
    {
      gu: '성북구',
      dong: [
        '성북동',
        '정릉동',
        '삼선동',
        '길음동',
        '하월곡동',
        '상월곡동',
        '종암동',
        '장위동',
        '석관동',
        '동선동',
      ],
    },
    {
      gu: '송파구',
      dong: [
        '잠실동',
        '풍납동',
        '문정동',
        '가락동',
        '방이동',
        '거여동',
        '송파동',
        '오금동',
        '석촌동',
        '삼전동',
      ],
    },
    {
      gu: '양천구',
      dong: [
        '신월동',
        '목동',
        '오목교동',
        '염창동',
        '양천로',
        '가양동',
        '신정동',
        '행복한동',
        '우정동',
        '무대동',
      ],
    },
    {
      gu: '영등포구',
      dong: [
        '영등포동',
        '여의도동',
        '당산동',
        '양평동',
        '문래동',
        '신길동',
        '대림동',
        '대양동',
        '서대문동',
      ],
    },
    {
      gu: '용산구',
      dong: [
        '한남동',
        '이태원동',
        '효창동',
        '원효로',
        '용산동',
        '서빙고동',
        '보광동',
        '동빙고동',
        '남영동',
        '삼각산로',
      ],
    },
    {
      gu: '종로구',
      dong: [
        '청진동',
        '인사동',
        '종로1가',
        '종로2가',
        '종로3가',
        '종로4가',
        '종로5가',
        '내수동',
        '공평동',
        '세종로',
      ],
    },
    {
      gu: '중구',
      dong: [
        '을지로동',
        '명동',
        '회현동',
        '광희동',
        '삼각지동',
        '남대문로',
        '정동',
        '장충동',
        '필동',
        '청계천로',
      ],
    },
    {
      gu: '중랑구',
      dong: [
        '중화동',
        '면목동',
        '상봉동',
        '묵동',
        '신내동',
        '서울동',
        '동부시장',
        '용마산로',
        '양원동',
        '황당동',
      ],
    },
    {
      gu: '도봉구',
      dong: [
        '도봉동',
        '방학동',
        '창동',
        '쌍문동',
        '노해동',
        '구파발로',
        '방울동',
        '의정부동',
        '어울림동',
        '동북로',
      ],
    },
    {
      gu: '노원구',
      dong: [
        '중계동',
        '상계동',
        '하계동',
        '월계동',
        '공릉동',
        '태릉동',
        '계양동',
        '소각장',
        '불암산',
      ],
    },
    {
      gu: '은평구',
      dong: [
        '불광동',
        '대조동',
        '갈현동',
        '응암동',
        '수색동',
        '진관동',
        '구산동',
        '녹번동',
        '상암동',
        '수성동',
      ],
    },
    {
      gu: '서대문구',
      dong: [
        '창천동',
        '홍제동',
        '연희동',
        '신촌동',
        '남가좌동',
        '북가좌동',
        '합동',
        '성산동',
        '가좌동',
        '중림동',
      ],
    },
    {
      gu: '서초구',
      dong: [
        '서초동',
        '반포동',
        '방배동',
        '양재동',
        '내곡동',
        '우면동',
        '청담동',
        '논현동',
        '신사동',
        '잠원동',
      ],
    },
  ];

  const onDistrictChange = () => {
    // 구에 따라 동 바꾸는 로직
  };
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="w-full h-full mt-[96px]">
      <div class="flex">
        <!-- 병원 분류 버튼-->
        <div class="h-[2000px] w-[120px] bg-main-400">
          <div>
            <template v-for="icon in hospitalIcons" :key="icon.name">
              <div
                class="w-full border-b-1 px-[22px] py-[14px] border-main-50 flex flex-col gap-[12px] items-center"
              >
                <component :is="icon.component" class="size-[32px] text-main-50" />
                <p class="text-main-50 text-center text-[18px] font-medium leading-[22px]">
                  {{ icon.name }}
                </p>
              </div>
            </template>
          </div>
        </div>
        <!-- 검색 & 리스트 -->
        <div>
          <!-- 검색 -->
          <div></div>
          <!-- 리스트 -->
          <div></div>
        </div>
        <!-- 상세 정보 -->
        <div></div>
        <!-- 지도 -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  :deep(.v-icon) {
    color: var(--color-mono-500);
  }
</style>
