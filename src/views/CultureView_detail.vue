<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const route = useRoute();
const festivalId = route.params.id; // URL에서 `id` 가져오기
// 줄바꿈 및 <br> 태그를 변환하는 함수
const formatText = (text: string) => {
  return text.replace(/\n/g, '<br>').replace(/\\n/g, '<br>');
};
</script>

<template>
  <div class="w-full">
    <!-- 배너 -->
    <div class="w-full h-[340px] relative flex items-center bg-main-300 px-10">
      <div class="w-full max-w-[1600px] mx-auto flex items-center justify-between">
        <!-- 배너 텍스트 -->
        <div class="flex-1 text-left transform translate-y-12">
          <p class="text-[16px] text-mono-600">홈 / 문화생활</p>
          <h1 class="text-[52px] font-bold text-mono-900">문화생활</h1>
          <p class="text-[24px] text-mono-600 mt-2">문화 체험의 일정부터 정보까지, 설레는 여정</p>
        </div>
        <!-- 배너 이미지 -->
        <div class="w-[400px] h-[244px] flex items-end transform translate-y-12">
          <img src="/images/festival/culture_detail.png" alt="Festival Detail" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
    <!-- 컨텐츠 영역 -->
    <div class="max-w-[1600px] mx-auto flex mt-10 gap-10">
      <!-- 좌측 버튼들 -->
      <div class="flex flex-col items-center space-y-4">
        <button class="w-[52px] h-[52px] bg-gray-200 rounded-full flex items-center justify-center">
          <img src="/images/festival/scrap.png" alt="Scrap" class="w-6 h-6" />
        </button>
        <button class="w-[52px] h-[52px] bg-gray-200 rounded-full flex items-center justify-center">
          <img src="/images/festival/share.png" alt="Share" class="w-6 h-6" />
        </button>
      </div>

      <!-- 축제 이미지 스와이퍼 -->
      <div class="w-[496px] h-[684px] min-h-[684px]">
        <Swiper :modules="[Pagination, Navigation]" :pagination="{ clickable: true }" :navigation="true">
          <SwiperSlide>
            <img src="/images/festival/banner0.png" alt="Festival Image" class="w-full h-full object-cover aspect-[496/684]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/festival/banner1.jpg" alt="Festival Image" class="w-full h-full object-cover aspect-[496/684]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/festival/banner2.jpg" alt="Festival Image" class="w-full h-full object-cover aspect-[496/684]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/festival/banner3.jpg" alt="Festival Image" class="w-full h-full object-cover aspect-[496/684]" />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- 축제 정보 -->
      <div class="w-[916px] p-6 border border-mono-300 rounded-lg">
        <div class="bg-main-400 text-white text-lg font-semibold px-4 py-2 rounded d-inline-block">공연/뮤지컬</div>
        <h1 class="text-[52px] font-bold text-mono-900 mt-4">서울 스프링 페스타</h1>
        <div class="flex items-center gap-2 mt-4">
          <img src="/images/festival/calendar1.png" alt="Calendar" class="w-6 h-6" />
          <p class="text-[32px] text-mono-900">2025.04.30 ~ 2025.05.06</p>
        </div>
        <div class="w-[788px] h-[2px] bg-main-500 my-4"></div>
        <h2 class="text-[24px] font-semibold">행사 소개</h2>
        <p class="text-[20px] text-mono-600 mt-2">‘서울스프링페스타’는 세계인들이 사랑하는 K-콘텐츠, K-컬처의 중심지 대한민국 수도 서울에서 펼쳐지는 종합 문화·관광 축제이다. 이곳 서울에는 각종 K-Contents들 속에서 접했던 대한민국의 ‘뷰티, 패션, K-Pop, 음식, 예술’ 등의 정수가 모두 모여 있다. ‘서울스프링페스타’는 바로 서울이 지닌 다채로운 매력들을 한자리에서 경험할 수 있는 서울에서 가장 큰 축제이다. 각기 다른 매력을 품은 대한민국의 4계절 가운데, 가장 좋은 날씨를 가진 따뜻한 대한민국의 봄날에 열린다.</p>
        <h2 class="text-[24px] font-semibold mt-6">행사 내용</h2>
        <p class="text-[20px] text-mono-600 mt-2" v-html="formatText('대표 프로그램 \n3 BIG SHOWS\n- 원더쇼(WONDER SHOW) : K-POP 아티스트들의 화려한 공연을 즐길 수 있는, 서울페스타의 시작을 알리는 오프닝 콘서트\n- 시그니처쇼(SIGNATURE SHOW) : 서울의 랜드마크를 통해 전달하는 서울의 놀랍고 빛나는 이야기\n- 로드쇼(ROAD SHOW) : 미션투어, 게임, 댄스파티 등 서울을 달리며 즐길 수 있는 로드이벤트\n\n3 THEME SPOTS\n- 원더파크 (WONDER PARK) : 매일 매일 열리는 새로운 쇼 이벤트 속에 시민들이 함께 참여하는 이색체험 공간\n- 원더플라자(WONDER PLAZA) : 서울의 놀라운 매력들이 한데 모인 FUN CITY컨셉의 마켓 및 복합 이벤트 공간\n- 원더풀 로드(WONDERFUL ROAD) : 서울을 대표하는 덕수궁길 위에서 펼쳐지는 봄꽃이 가득 피어난 아름다운 전시 공간')"></p>
        <div class="w-[788px] h-[2px] bg-main-500 my-4"></div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-4">
            <img src="/images/festival/location1.png" alt="Location" class="w-6 h-6" />
            <p class="text-[24px] text-mono-900">서울특별시 종로구 세종대로 175 세종이야기</p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/images/festival/clock1.png" alt="Time" class="w-6 h-6" />
            <p class="text-[24px] text-mono-900">19:30 ~ 21:00</p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/images/festival/info.png" alt="Info" class="w-6 h-6" />
            <p class="text-[24px] text-mono-900">서울 특별시, 서울관광재단</p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/images/festival/call1.png" alt="Phone" class="w-6 h-6" />
            <p class="text-[24px] text-mono-900">070-4880-4807</p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/images/festival/web1.png" alt="Website" class="w-6 h-6" />
            <a href="https://seoulfesta.com/2025/" class="text-[24px] text-mono-900 underline">https://seoulfesta.com/2025/</a>
          </div>
        </div>
        <div class="w-[788px] h-[2px] bg-main-500 my-4"></div>
        <h2 class="text-[24px] font-semibold">위치</h2>
        <img src="/images/festival/map1.png" alt="Map" class="w-full h-auto mt-4" />
        <button class="mt-6 px-6 py-3 bg-main-400 text-white text-lg font-semibold rounded-lg inline-block">목록 보기</button>
      </div>
    </div>
  </div>
</template>
