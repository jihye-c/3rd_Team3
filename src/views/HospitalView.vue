<script setup lang="ts">
  import ClinicIcon from '@/assets/icons/clinic.svg';
  import TertiaryHospitalIcon from '@/assets/icons/tertiaryHospital.svg';
  import GeneralHospitalIcon from '@/assets/icons/generalHospital.svg';
  import HospitalIcon from '@/assets/icons/hospital.svg';
  import PublicHealthCenterIcon from '@/assets/icons/publicHealthCenter.svg';
  import OrientalMedicineClinicIcon from '@/assets/icons/orientalMedicineClinic.svg';
  import DentalClinicIcon from '@/assets/icons/dentalClinic.svg';
  import HospitalPostList from '@/components/hospital/HospitalPostList.vue';
  import HospitalDetailCard from '@/components/hospital/HospitalDetailCard.vue';
  import {ref} from 'vue';

  // 아이콘 데이터 배열 정의
  const hospitalIcons = [
    {id: 'clinic', name: '동네 병원 (의원)', component: ClinicIcon},
    {id: 'tertiaryHospital', name: '상급종합', component: TertiaryHospitalIcon},
    {id: 'generalHospital', name: '종합병원', component: GeneralHospitalIcon},
    {id: 'hospital', name: '병원', component: HospitalIcon},
    {id: 'publicHealthCenter', name: '보건기관', component: PublicHealthCenterIcon},
    {id: 'orientalMedicineClinic', name: '한의원', component: OrientalMedicineClinicIcon},
    {id: 'dentalClinic', name: '치과', component: DentalClinicIcon},
  ];

  // 지역 리스트 (임시, 내용 정확하지 않음)
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
  ];

  // 병원 리스트 데이터
  const hospitalList = [
    {
      addr: '서울특별시 종로구 대학로 101, (연건동)',
      closed_holiday: '휴무',
      closed_sun: '휴무',
      closetime_fri: '1700',
      closetime_mon: '1700',
      closetime_sat: '1300',
      closetime_sun: null,
      closetime_thu: '1700',
      closetime_tue: '1700',
      closetime_wed: '1700',
      dong: '연건동',
      emergency_day: 'Y',
      emergency_day_call1: '02-2072-3564',
      emergency_day_call2: '02-2072-2474',
      emergency_night: 'Y',
      emergency_night_call1: '02-2072-3564',
      emergency_night_call2: '02-2072-2474',
      gu_code: 110016,
      gu_name: '종로구',
      homepage: 'http://www.snuh.org',
      id: 'JDQ4MTg4MSM1MSMkMSMkMCMkODkkMzgxMzUxIzExIyQxIyQzIyQ3OSQzNjE4MzIjODEjJDEjJDYjJDgz',
      location_direction: '3번출구',
      location_distance: '100M',
      location_place: '혜화역',
      lunchbreak_sat: null,
      lunchbreak_weekday: '12:00~13:00',
      mapx: 126.9990168,
      mapy: 37.5797151,
      name: '서울대학교병원',
      open_date: '19810709',
      opentime_fri: null,
      opentime_mon: null,
      opentime_sat: null,
      opentime_sun: null,
      opentime_thu: null,
      opentime_tue: null,
      opentime_wed: null,
      parking_capacity: '951',
      parking_cost: 'Y',
      parking_etc:
        '진료예약 및 진료비수납 1시간 무료, 장애인 및 국가유공자 3시간 무료, 진료, 검사 및 입,퇴원 4시간 무료, 당일진료+입원 6시간 무료, 2개과 진료 및 특수검사 8시간 무료',
      post_num: 3080,
      reception_sat: null,
      reception_weekday: null,
      tel: '1588-5700',
      traffic: null,
      type: '상급종합',
    },
  ];

  // 선택된 병원 데이터 (상세정보 보여줄 병원)
  const selectedHospital = {
    addr: '서울특별시 종로구 대학로 101, (연건동)',
    closed_holiday: '휴무',
    closed_sun: '휴무',
    closetime_fri: '1700',
    closetime_mon: '1700',
    closetime_sat: '1300',
    closetime_sun: null,
    closetime_thu: '1700',
    closetime_tue: '1700',
    closetime_wed: '1700',
    dong: '연건동',
    emergency_day: 'Y',
    emergency_day_call1: '02-2072-3564',
    emergency_day_call2: '02-2072-2474',
    emergency_night: 'Y',
    emergency_night_call1: '02-2072-3564',
    emergency_night_call2: '02-2072-2474',
    gu_code: 110016,
    gu_name: '종로구',
    homepage: 'http://www.snuh.org',
    id: 'JDQ4MTg4MSM1MSMkMSMkMCMkODkkMzgxMzUxIzExIyQxIyQzIyQ3OSQzNjE4MzIjODEjJDEjJDYjJDgz',
    location_direction: '3번출구',
    location_distance: '100M',
    location_place: '혜화역',
    lunchbreak_sat: null,
    lunchbreak_weekday: '12:00~13:00',
    mapx: 126.9990168,
    mapy: 37.5797151,
    name: '서울대학교병원',
    open_date: '19810709',
    opentime_fri: null,
    opentime_mon: null,
    opentime_sat: null,
    opentime_sun: null,
    opentime_thu: null,
    opentime_tue: null,
    opentime_wed: null,
    parking_capacity: '951',
    parking_cost: 'Y',
    parking_etc:
      '진료예약 및 진료비수납 1시간 무료, 장애인 및 국가유공자 3시간 무료, 진료, 검사 및 입,퇴원 4시간 무료, 당일진료+입원 6시간 무료, 2개과 진료 및 특수검사 8시간 무료',
    post_num: 3080,
    reception_sat: null,
    reception_weekday: null,
    tel: '1588-5700',
    traffic: null,
    type: '상급종합',
  };

  // 증상 데이터
  const symptoms = [
    {
      id: 'abdominal_pain',
      name: '복통',
      image: '/images/hospital/abdominal_pain.svg',
    },
    {
      id: 'fever',
      name: '열/오한',
      image: '/images/hospital/fever.svg',
    },
    {
      id: 'burn',
      name: '화상',
      image: '/images/hospital/burn.svg',
    },
    {
      id: 'tinnitus',
      name: '이명',
      image: '/images/hospital/tinnitus.svg',
    },
    {
      id: 'vomiting',
      name: '구토',
      image: '/images/hospital/vomiting.svg',
    },
    {
      id: 'cough',
      name: '기침',
      image: '/images/hospital/cough.svg',
    },
    {
      id: 'fracture',
      name: '골절',
      image: '/images/hospital/fracture.svg',
    },
    {
      id: 'muscle_pain',
      name: '근육통',
      image: '/images/hospital/muscle_pain.svg',
    },
    {
      id: 'fatigue',
      name: '피로감',
      image: '/images/hospital/fatigue.svg',
    },
    {
      id: 'emergency',
      name: '응급',
      image: '/images/hospital/emergency.svg',
    },
    {
      id: 'headache',
      name: '두통',
      image: '/images/hospital/headache.svg',
    },
    {
      id: 'toothache',
      name: '치통',
      image: '/images/hospital/toothache.svg',
    },
    {
      id: 'urinary',
      name: '비뇨',
      image: '/images/hospital/urinary.svg',
    },
    {
      id: 'eye_congestion',
      name: '충혈',
      image: '/images/hospital/eye_congestion.svg',
    },
    {
      id: 'menstrual_pain',
      name: '생리통',
      image: '/images/hospital/menstrual_pain.svg',
    },
    {
      id: 'depression',
      name: '우울증',
      image: '/images/hospital/depression.svg',
    },
  ];

  // 선택된 병원 종류
  const selectedHospitalType = ref('clinic'); // default 의원

  // 상세페이지 표시 여부
  const isDetailPageShow = ref(false);

  // 증상 선택 버튼 표시 여부
  const isSymptomButtonShow = ref(true);

  // 병원 종류 선택하기
  const selectHospitalType = (type: string) => {
    selectedHospitalType.value = type;
    // 임시로 동네병원일 때만 증상 선택할 수 있게 함
    if (type === 'clinic') {
      isSymptomButtonShow.value = true;
    } else {
      isSymptomButtonShow.value = false;
    }
    // 병원 종류 바뀌면 열려있던 상세 페이지 닫기
    isDetailPageShow.value = false;
  };

  // 상세페이지 열기
  const openDetail = () => {
    isDetailPageShow.value = true;
  };

  // 상세페이지 닫기
  const closeDetail = () => {
    isDetailPageShow.value = false;
  };

  const onDistrictChange = () => {
    // 구에 따라 동 바꾸는 로직 추가하기
  };
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="w-full h-[calc(100vh-96px)] mt-[96px]">
      <div class="flex h-full">
        <!-- 병원 분류 버튼-->
        <div class="w-[120px] bg-main-400">
          <div>
            <template v-for="icon in hospitalIcons" :key="icon.id">
              <div
                class="w-full border-b-1 px-[22px] py-[14px] border-main-50 flex flex-col gap-[12px] items-center"
                :class="selectedHospitalType === icon.id ? 'bg-main-50' : 'bg-main-400'"
                @click="selectHospitalType(icon.id)"
              >
                <component
                  :is="icon.component"
                  :class="selectedHospitalType === icon.id ? 'text-main-400' : 'text-main-50 '"
                />
                <p
                  class="text-center text-[18px] font-medium leading-[22px]"
                  :class="selectedHospitalType === icon.id ? 'text-main-400' : 'text-main-50 '"
                >
                  {{ icon.name }}
                </p>
              </div>
            </template>
          </div>
        </div>
        <!-- 검색 & 리스트 -->
        <div class="flex flex-col w-[380px] shadow-[4px_0_10px_rgba(0,0,0,0.1)] h-full">
          <!-- 검색 -->
          <div class="flex flex-col p-6 border-b-1 border-mono-300">
            <div class="text-[20px] font-semibold text-mono-700">카테고리 검색</div>
            <div class="flex gap-4 pt-4">
              <v-select
                label="구 선택"
                :items="districts.map((district) => district.gu)"
                variant="outlined"
                rounded="lg"
                density="compact"
              ></v-select>
              <v-select
                label="동 선택"
                variant="outlined"
                rounded="lg"
                density="compact"
              ></v-select>
            </div>
            <div
              class="h-[40px] w-full border-1 border-mono-300 rounded-[8px] flex justify-between px-4"
            >
              <input
                type="text"
                placeholder="병원 이름 검색"
                class="text-[16px] font-normal text-mono-700 placeholder-mono-400 outline-none"
              />
              <button>
                <v-icon class="search">mdi-magnify</v-icon>
              </button>
            </div>
          </div>

          <div class="h-full pb-[60px] overflow-y-auto">
            <!-- 증상 필터 -->
            <div
              class="flex flex-col gap-4 p-6 border-b-1 border-mono-200"
              v-if="isSymptomButtonShow"
            >
              <div class="text-[20px] font-semibold text-mono-700">증상 선택</div>
              <div class="grid grid-cols-3 gap-[20px] justify-center items-center">
                <template v-for="(item, index) in symptoms">
                  <div
                    class="flex flex-col gap-1.5 justify-center items-center py-[12px] w-[88px] h-[88px] bg-main-50 rounded-[12px] border-1 border-main-400"
                    :class="index === symptoms.length - 1 ? 'col-start-2' : ''"
                  >
                    <img :src="item.image" alt="symptom_icon" class="w-[40px] h-[40px]" />
                    <div class="text-[16px] text-main-500 font-medium">
                      {{ item.name }}
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- 리스트 -->
            <div class="flex flex-col py-[24px]">
              <template v-for="item in hospitalList">
                <HospitalPostList
                  :name="item.name"
                  :type="item.type"
                  :close-time="item.closetime_mon"
                  :addr="item.addr"
                  @click="openDetail"
                />
              </template>
            </div>
          </div>
        </div>
        <!-- 상세 정보 -->
        <div>
          <HospitalDetailCard
            v-show="isDetailPageShow"
            @close="closeDetail"
            :name="selectedHospital.name"
            :type="selectedHospital.type"
            :tel="selectedHospital.tel"
            :addr="selectedHospital.addr"
            :homepage="selectedHospital.homepage"
            :lunchbreack_weekday="selectedHospital.lunchbreak_weekday"
            :lunchbreack_sat="selectedHospital.lunchbreak_sat"
            :reception_weekday="selectedHospital.reception_weekday"
            :reception_sat="selectedHospital.reception_sat"
            :parking_etc="selectedHospital.parking_etc"
          />
        </div>
        <!-- 지도 -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  :deep(.v-icon.search) {
    color: var(--color-mono-500);
  }
</style>
