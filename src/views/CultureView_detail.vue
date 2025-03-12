<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCultureStore } from "../stores/cultureStore";
import CultureAPI from "@/apis/cultureApi";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import KakaoMap_festival from "@/components/KakaoMap_festival.vue";
import BookmarkButton from '@/components/BookmarkButton.vue';
import ShareButton from '@/components/ShareButton.vue';

// import { getUserScrapList } from "@/apis/userService"; 

const router = useRouter();
const route = useRoute();
const festivalId = ref(route.params.id);
const festivalImages = ref<string[]>([]);
const festivalDetail = ref<any>(null);
const categoryName = ref("");
const title = ref("");
const eventPeriod = ref("");
const eventIntro = ref("");
const eventContent = ref<Array<{ type: string; text: string }>>([]);
const location = ref("");
const playtime = ref("");
const sponsor1 = ref("");
const sponsor2 = ref("");
const phoneNumber = ref("");
const website = ref("");
const cultureStore = useCultureStore();
const userId = ref(localStorage.getItem("userId") || "");

// ✅ 현재 상세 페이지의 이벤트가 북마크되었는지 확인
const isBookmarked = computed(() => {
  return cultureStore.bookmarkedFestivals.some(festival => festival.content_id === festivalId.value);
});

import { toggleScrap } from "@/apis/userService"; 
const toggleBookmark = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("⚠️ 로그인이 필요합니다.");
      return;
    }

    if (festivalDetail.value) {
      const newBookmark = {
        content_id: festivalDetail.value.content_id,
        name: festivalDetail.value.name,
        category3: festivalDetail.value.category3,
        homepage: festivalImages.value.length > 0 ? festivalImages.value[0] : "/images/default-image.jpg",
        overview: festivalDetail.value.overview || "설명 없음",
        event_start_date: eventIntro.value.event_start_date && eventIntro.value.event_start_date !== "날짜 미정"
          ? eventIntro.value.event_start_date
          : "날짜 미정",
        event_end_date: eventIntro.value.event_end_date && eventIntro.value.event_end_date !== "날짜 미정"
          ? eventIntro.value.event_end_date
          : "날짜 미정",
        gu_name: festivalDetail.value.address || "주소 정보 없음",
        channel: "culture", // ✅ 채널 정보 추가 (문화생활)
      };

      console.log("✅ 북마크 추가/삭제 요청:", newBookmark);

      // ✅ scrap 채널에 저장 or 삭제 (서버에 요청)
      const updatedScraps = await toggleScrap(userId, newBookmark);

      // ✅ 최신 북마크 목록으로 업데이트
      cultureStore.bookmarkedFestivals = updatedScraps;

      console.log("✅ 북마크 업데이트 완료!");
    }
  } catch (error) {
    console.error("❌ 북마크 저장 실패:", error);
  }
};

// 서브카테고리 목록
const subCategories = [
  { name: "문화관광축제", code: "A02070100" },
  { name: "일반축제", code: "A02070200" },
  { name: "전통공연", code: "A02080100" },
  { name: "연극", code: "A02080200" },
  { name: "뮤지컬", code: "A02080300" },
  { name: "오페라", code: "A02080400" },
  { name: "전시회", code: "A02080500" },
  { name: "박람회", code: "A02080600" },
  { name: "무용", code: "A02080800" },
  { name: "클래식음악회", code: "A02080900" },
  { name: "대중콘서트", code: "A02081000" },
  { name: "영화", code: "A02081100" },
  { name: "스포츠경기", code: "A02081200" },
  { name: "기타행사", code: "A02081300" },
];


// const loadBookmarks = async () => {
//   if (userId.value) {
//     await cultureStore.loadBookmarks(userId.value);
//   }
// };
onMounted(async () => {
  console.log("🔑 Kakao API Key:", import.meta.env.VITE_KAKAO_MAP_KEY);
  
  fetchFestivalDetails(); // ✅ 행사 정보 불러오기

  // ✅ 유저가 로그인 되어 있다면 스크랩 목록 불러오기
  // if (userId.value) {
  //   const scrapList = await getUserScrapList(userId.value);
  //   cultureStore.bookmarkedFestivals = scrapList;
  // }
});

  // ✅ 서브카테고리 코드 → 한글 이름 변환 함수
  const getCategoryName = (code: string) => {
    const category = subCategories.find((sub) => sub.code === code);
    return category ? category.name : '기타'; // 코드 매칭 안되면 '기타'로 표시
  };

  const fetchFestivalDetails = async () => {
    try {
      // 행사 세부 데이터 가져오기
      const festivalData = await CultureAPI.getEventDetail(festivalId.value);
      if (!festivalData) {
        console.error('❌ 행사 세부 정보가 없습니다.');
        return;
      }
      // ✅ 좌표값 로그 확인
      console.log('🌍 좌표값 확인:', festivalData.longitude, festivalData.latitude);

      // ✅ festivalData에 값 설정 (좌표 값이 없으면 null 처리)
      festivalDetail.value = {
        ...festivalData,
        longitude: festivalData.longitude || null,
        latitude: festivalData.latitude || null,
        address: festivalData.address || '주소 정보 없음',
      };

      // 카테고리명
      categoryName.value = getCategoryName(festivalData.category3);

      // 제목
      title.value = festivalData.name;

      // 행사 소개
      const eventIntroData = await CultureAPI.getEventIntro(
        festivalId.value,
        festivalData.content_type_id,
      );
      eventIntro.value = {
        event_start_date:
          eventIntroData?.event_start_date && eventIntroData.event_start_date.length === 8
            ? eventIntroData.event_start_date
            : '날짜 미정',
        event_end_date:
          eventIntroData?.event_end_date && eventIntroData.event_end_date.length === 8
            ? eventIntroData.event_end_date
            : '날짜 미정',
        event_intro: eventIntroData?.event_intro || '행사 소개가 없습니다.',
      };

      // 행사 기간 (예: 2025.04.30 ~ 2025.05.06)
      eventPeriod.value = `${formatDate(eventIntroData.event_start_date)} ~ ${formatDate(
        eventIntroData.event_end_date,
      )}`;

      // 행사 내용
      const eventInfoData = await CultureAPI.getEventInfo(
        festivalId.value,
        festivalData.content_type_id,
      );
      if (eventInfoData && eventInfoData.length > 0) {
        eventContent.value = eventInfoData.map((info) => {
          if (info.field_category === '1') {
            return {type: '내용', text: info.info_text};
          } else if (info.field_category === '2') {
            return {type: '소개', text: info.info_text};
          }
        });
      } else {
        eventContent.value = [{type: '내용', text: '행사 내용이 없습니다.'}];
      }

      // 행사 위치
      location.value = festivalData.address || '주소 정보 없음';

      // 운영 시간
      playtime.value = eventIntroData.playtime || '운영시간 정보 없음';

      // 후원자
      sponsor1.value = eventIntroData.sponsor1 || '후원자 정보 없음';
      sponsor2.value = eventIntroData.sponsor2 || '후원자 정보 없음';

      // 전화번호
      phoneNumber.value = festivalData.phone_number || '전화번호 정보 없음';

      // 홈페이지 URL
      website.value = festivalData.homepage || '홈페이지 정보 없음';

      // 행사 이미지 가져오기
      const images = await CultureAPI.getEventImages(festivalId.value);
      if (images && Array.isArray(images)) {
        festivalImages.value = images.map(
          (item) => item.originimgurl || item.original_image_url || item.small_image_url,
        );
      }
    } catch (error) {
      console.error('❌ 행사 정보 가져오기 실패:', error);
    }
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    if (!dateString || dateString.length !== 8) return '날짜 미정';
    return `${dateString.substring(0, 4)}.${dateString.substring(
      4,
      6,
    )}.${dateString.substring(6, 8)}`;
  };

  // 줄바꿈 처리 함수
  const formatText = (text: string) => {
    return text.replace(/\n/g, '<br>').replace(/\\n/g, '<br>');
  };

  // Website URL에서 불필요한 HTML 속성 제거 및 링크 변환
  const formatWebsiteLinks = (text: string) => {
    const urlRegex = /<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g;
    // 링크를 간단한 URL로 변환하여 표시
    return text.replace(urlRegex, (match, url, innerText) => {
      return `<a href="${url}" target="_blank" title="새창에서 열기">${innerText}</a>`;
    });
  };

  const goBack = () => {
    router.back(); // ✅ 브라우저의 뒤로 가기 기능과 동일
  };

  onMounted(() => {
    console.log('🔑 Kakao API Key:', import.meta.env.VITE_KAKAO_MAP_KEY); // ✅ API 키 출력 확인
    fetchFestivalDetails(); // ✅ 행사 정보 불러오기
  });
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
          <img
            src="/images/festival/culture_detail.png"
            alt="Festival Detail"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    <!-- 컨텐츠 영역 -->
    <div class="max-w-[1600px] mx-auto flex mt-10 gap-10">
      <!-- 좌측 버튼들 -->
      <div class="border-mono-200 w-[52px] h-[104px] flex flex-col gap-[12px]">
        <!-- 스크랩, 공유 버튼 -->
        <BookmarkButton
          :cultureData="{
            title: title,
            contentId: festivalId,
            eventEndDate: eventIntro.event_start_date,
            eventStartDate: eventIntro.event_end_date,
            location: location,
            image_src: festivalImages[0],
          }"
        />
        <ShareButton />
      </div>

      <!-- 축제 이미지 스와이퍼 -->
      <div class="w-[496px] h-[684px] min-h-[684px]">
        <Swiper
          :modules="[Pagination, Autoplay]"
          :pagination="{clickable: true}"
          :autoplay="{delay: 3000, disableOnInteraction: false}"
          :loop="true"
          :speed="2000"
        >
          <SwiperSlide v-for="(image, index) in festivalImages" :key="index">
            <img
              :src="image"
              alt="Festival Image"
              class="w-full h-full object-cover aspect-[496/684]"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- 축제 정보 -->
      <div class="w-[916px] p-6 border border-mono-300 rounded-lg">
        <!-- 동적으로 서브카테고리 이름을 표시 -->
        <div class="bg-main-400 text-white text-lg font-semibold px-4 py-2 rounded d-inline-block">
          {{ categoryName }}
        </div>
        <h1 class="text-[52px] font-bold text-mono-900 mt-4">{{ title }}</h1>
        <div class="flex items-center gap-2 mt-4">
          <img src="/images/festival/calendar1.png" alt="Calendar" class="w-6 h-6" />
          <p class="text-[32px] text-mono-900">{{ eventPeriod }}</p>
        </div>
        <div class="w-[788px] h-[2px] bg-main-500 my-4"></div>

        <!-- 행사 소개 -->
        <h2 class="text-[24px] font-semibold">행사 소개</h2>
        <p
          class="text-[20px] text-mono-600 mt-2"
          v-html="
            formatText(
              eventContent.find((item) => item.type === '소개')?.text || '소개가 없습니다.',
            )
          "
        ></p>

        <!-- 행사 내용 -->
        <h2
          class="text-[24px] font-semibold mt-6"
          v-if="eventContent.find((item) => item.type === '내용')"
        >
          행사 내용
        </h2>
        <p
          class="text-[20px] text-mono-600 mt-2"
          v-if="eventContent.find((item) => item.type === '내용')"
          v-html="
            formatText(
              eventContent.find((item) => item.type === '내용')?.text || '내용이 없습니다.',
            )
          "
        ></p>

        <div class="w-[788px] h-[2px] bg-main-500 my-4"></div>

        <!-- 기타 정보 -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-4">
            <img src="/images/festival/location1.png" alt="Location" class="w-6 h-6" />
            <p class="text-[24px] text-mono-900">{{ location }}</p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/images/festival/clock1.png" alt="Time" class="w-6 h-6" />
            <p class="text-[24px] text-mono-900" v-html="formatText(playtime)"></p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/images/festival/info.png" alt="Info" class="w-6 h-6" />
            <p class="text-[24px] text-mono-900">{{ sponsor1 }} / {{ sponsor2 }}</p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/images/festival/call1.png" alt="Phone" class="w-6 h-6" />
            <p class="text-[24px] text-mono-900">{{ phoneNumber }}</p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/images/festival/web1.png" alt="Website" class="w-6 h-6" />
            <p class="text-[24px] text-mono-900" v-html="formatWebsiteLinks(website)"></p>
          </div>
        </div>

        <div class="w-[788px] h-[2px] bg-main-500 my-4"></div>

        <!-- 지도 -->
        <h2 class="text-[24px] font-semibold">위치</h2>
        <!-- festivalData가 있을 때만 KakaoMap 렌더링 -->
        <KakaoMap_festival
          v-if="festivalDetail?.longitude && festivalDetail?.latitude"
          :mapx="Number(festivalDetail.longitude)"
          :mapy="Number(festivalDetail.latitude)"
          :title="festivalDetail.name"
        />
        <p v-else class="text-red-500">⚠️ 지도 정보를 불러올 수 없습니다.</p>
        <!-- 목록 보기 버튼 -->
        <button
          @click="goBack"
          class="mt-6 px-6 py-3 bg-main-400 text-mono-100 text-lg font-semibold rounded-lg inline-block cursor-pointer"
        >
          목록 보기
        </button>
      </div>
    </div>
  </div>
</template>
