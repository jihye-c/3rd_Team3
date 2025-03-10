<script setup lang="ts">
  import {computed, onMounted, ref, watch} from 'vue';
  import {useRoute, useRouter} from 'vue-router';

  import type {MapData} from '@/types/kakao';
  import type {FullHospitalRes} from '@/types/hospitalType';

  import HospitalPostList from '@/components/hospital/HospitalPostList.vue';
  import HospitalDetailCard from '@/components/hospital/HospitalDetailCard.vue';
  import SymptomsFilter from '@/components/hospital/SymptomsFilter.vue';
  import HospitalMap from '@/components/hospital/HospitalMap.vue';

  import hospitalIcons from '@/assets/data/hospitalIcons';
  import Supabase from '@/apis/supabase';
  import {left} from '@popperjs/core';
import NoDataLottie from '@/components/NoDataLottie.vue';

  const router = useRouter();
  const route = useRoute();

  //-----------------------------화면 제어 관련-----------------------------//
  const isDetailPageShow = ref(false); // 상세페이지 표시 여부
  const isSymptomButtonShow = ref(false); // 증상 선택 버튼 표시 여부
  const hospitalList = ref<FullHospitalRes>({length: 0, data: null});
  const searchKeyword = ref('');
  const selectedHospital = ref<string>('');

  // 병원 종류 선택하기
  
  const selectHospitalType = (type: string) => {
    if (selectedHospitalType.value == type) return;
    router.push({path: route.path, query: {type: type}});
    selectedHospitalType.value = type;
    if (type === 'clinic') {
      isSymptomButtonShow.value = true;
    } else {
      isSymptomButtonShow.value = false;
    }
    isDetailPageShow.value = false;
  };

  const openDetail = (id:string) => {
    selectedHospital.value = id;
    isDetailPageShow.value = true;
  };
  const closeDetail = () => {
    isDetailPageShow.value = false;
  };

  //----------------------------- 리사이징 함수 -----------------------------//
  const resizable = ref([
    {width: 380, minWidth: 240, maxWidth: 460, hide: false},
    {width: 380, minWidth: 240, maxWidth: 460},
  ]);

  const isResizing = ref(false);
  let startX = 0;
  let activeIdx: number = 0;

  const startResize = (idx: number, e) => {
    e.preventDefault();
    isResizing.value = true;
    startX = e.clientX;
    activeIdx = idx;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopResize);
  };

  const onMouseMove = (e) => {
    if (isResizing.value) {
      const dragCheck = 5;
      const diff = e.clientX - startX;
      const activeDiv = resizable.value[activeIdx];
      const newWidth = activeDiv.width + diff;
      if (newWidth <= activeDiv.minWidth && activeIdx === 0) {
        if (diff < -dragCheck) {
          activeDiv.width = 0;
          activeDiv.hide = true;
        } else if (diff > dragCheck) {
          activeDiv.width = activeDiv.minWidth;
          activeDiv.hide = false;
        }
      } else {
        activeDiv.width = Math.max(activeDiv.minWidth, Math.min(newWidth, activeDiv.maxWidth));
      }
      startX = e.clientX;
    }
  };

  const stopResize = () => {
    isResizing.value = false;
    activeIdx = 0;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', stopResize);
  };

  //----------------------------- 맵 관련 -----------------------------//
  const mapData = ref<MapData>({
    bounds: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    lng: 126.97672186606,
    lat: 37.576030700103,
    level: 3,
  });
  const isMapChange = ref(false);
  const nowPage = ref(1);
  const totalPage = computed(() => Math.ceil(hospitalList.value.length / 10));
  const selectedHospitalType = ref('clinic'); // 선택된 병원 종류, default 의원

  const loadHospital = async () => {
    const nowType = route.query.type || 'clinic'; // 기본값 설정
    const nowHospital = hospitalIcons.find((type) => type.id === nowType);
    let nowSymtoms: string[] = [];

    if (route.query.sym && route.query.sym?.length > 0) {
      nowSymtoms = route.query.sym as string[];
    }
    const res = await Supabase.getFullHospitalData(
      mapData.value,
      nowPage.value,
      nowHospital?.searchType,
      nowSymtoms,
    );
    if (res) {
      hospitalList.value = res;
    }
  };

  const searchSubmit = async () => {
    hospitalList.value = {length: 0, data: null};
    try {
      const res = await Supabase.getFullHospitalSearchData(searchKeyword.value, nowPage.value);
      if (res) {
        hospitalList.value = res;
        if (hospitalList.value.data) {
          isSymptomButtonShow.value = false;
          isDetailPageShow.value = false;
          selectHospitalType('');
          searchKeyword.value = '';
          router.push({path: route.path, query: {}});
          const firstData = hospitalList.value.data[0];
          mapData.value = {
            bounds: {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            },
            lat: firstData.mapy,
            lng: firstData.mapx,
            level: 1,
          };
        }
      }
    } catch (err) {
console.log('키워드 검색 중 에러가 발생했습니다.', err);
    }
  };

  onMounted(() => {
    router.replace({path: route.path, query: {type: 'clinic'}});
  });
  watch(
    () => route.query,
    () => {
      loadHospital();
    },
  );
</script>

<template>
  <div id="hospitalContent" class="h-screen overflow-hidden">
    <div class="w-full h-full flex pt-24">
      <div class="flex h-full relative z-10">
        <!-- 병원 분류 버튼-->
        <div class="w-28 bg-main-400 shrink-0">
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
        <div
          class="shadow-[4px_0_10px_rgba(0,0,0,0.1)] z-10 h-full relative flex flex-col"
          :style="{width: resizable[0].width + 'px'}"
        >
          <!-- 검색 -->
          <div class="border-b-1 border-mono-300">
            <div class="w-full overflow-hidden">
              <form class="wrap py-6 px-5" @submit.prevent="searchSubmit">
                <div class="text-[20px] pb-3 w-full font-semibold text-mono-700">검색</div>
                <v-text-field
                  v-model="searchKeyword"
                  append-inner-icon="mdi-magnify"
                  placeholder="병원 이름 검색"
                  variant="outlined"
                  rounded="lg"
                  density="compact"
                  class="h-[40px] w-full text-[16px] font-normal text-mono-700"
                ></v-text-field>
              </form>
            </div>
            <div class="border-b border-mono-200 flex flex-col grow overflow-hidden">
              <div class="wrap pb-6 px-5">
                <div
                  class="text-[20px] font-semibold text-mono-700 cursor-pointer"
                  @click="isSymptomButtonShow = !isSymptomButtonShow"
                >
                  증상 선택
                  <v-icon>{{ isSymptomButtonShow ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </div>
                <SymptomsFilter
                  v-show="isSymptomButtonShow"
                  :isSymptomButtonShow="isSymptomButtonShow"
                />
              </div>
            </div>
          </div>
          <div class="h-full grow shrink overflow-y-auto scrollbar">
            <!-- 리스트 -->
            <div class="pt-6 px-6 relative">
              <p class="text-right text-mono-300 absolute right-6">
                전체 : {{ hospitalList?.length }}개
              </p>
              <div v-if="hospitalList.data && hospitalList.data.length > 0" id="postList" class="flex flex-col">
                <template  v-for="(item, idx) in hospitalList?.data" :key="item.id">
                  <HospitalPostList
                    :class="{'border-t': idx !== 0}"
                    :data="item"
                    @click="openDetail(item.id)"
                  />
                </template>
                <v-pagination
                  v-model="nowPage"
                  @update:model-value="loadHospital"
                  v-show="hospitalList?.length && hospitalList?.length > 10"
                  :length="totalPage"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"
                  active-color="#f89a00"
                  density="comfortable"
                ></v-pagination>
              </div>
              <div v-if="!hospitalList.data || hospitalList.data.length < 1">
                <NoDataLottie/>
              </div>
            </div>
          </div>
          <div
            :class="{resizer: true, hide: resizable[0].hide}"
            @mousedown="(e) => startResize(0, e)"
          >
            <button
              class="justify-center items-center absolute cursor-pointer bg-main-400/40 hover:bg-main-400/85 backdrop-blur-sm"
              @click="
                () => {
                  resizable[0].width = 380;
                  resizable[0].hide = false;
                }
              "
            >
              <v-icon>mdi-chevron-right</v-icon>
            </button>
          </div>
        </div>
        <!-- 상세 정보 -->
        <div
          id="detialInfoBox"
          :style="{width: resizable[1].width + 'px'}"
          v-show="isDetailPageShow"
        >
          <div class="resizer" @mousedown="(e) => startResize(1, e)"></div>
          <HospitalDetailCard
          :selectedHospital="selectedHospital"
            @close="closeDetail"
          />
        </div>
      </div>
      <HospitalMap
        v-model:mapData="mapData"
        v-model:isMapChange="isMapChange"
        :loadHospital="loadHospital"
        :openDetail="openDetail"
        :hospitalList="hospitalList"
      />
    </div>
  </div>
</template>

<style scoped>
  #hospitalContent * {
    box-sizing: border-box;
  }
  #detialInfoBox {
    position: absolute;
    height: 100%;
    background: white;
    right: 0;
    top: 0;
    transform: translateX(100%);
  }
  :deep(.v-icon.search) {
    color: var(--color-mono-500);
  }
  :deep(.v-input__details) {
    display: none;
  }
  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 100%;
    cursor: ew-resize;
  }
  .resizer button {
    display: none;
    right: -32px;
    width: 32px;
    top: 50%;
    transform: translateY(-50%);
    height: 120px;
    border-radius: 0px 12px 12px 0px;
    box-shadow: inset 4px 0px 4px rgba(0, 0, 0, 0.1);
    color: white;
    transition: all 0.3s;
  }
  .resizer.hide {
    border-right: 1px solid var(--color-mono-200);
    width: 20px;
  }
  .resizer.hide button {
    display: flex;
  }

  /* 스크롤바의 폭 너비 */
  ::-webkit-scrollbar {
    width: 10px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
    background: var(--color-main-400);
    border: 3px solid white;
  }

  ::-webkit-scrollbar-track {
    background: transparent; /*스크롤바 뒷 배경 색상*/
  }
</style>
