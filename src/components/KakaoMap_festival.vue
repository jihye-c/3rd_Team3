<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

// 📌 Props 정의 (Number 타입 강제)
const props = defineProps<{
  mapx: number;
  mapy: number;
  title?: string;
}>();

const mapRef = ref<HTMLElement | null>(null);
const isScriptLoaded = ref(false);
const retryCount = ref(0);
const MAX_RETRY = 10;

// ✅ Kakao 지도 스크립트 로드 함수
const loadKakaoScript = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      isScriptLoaded.value = true;
      resolve(true);
      return;
    }

    const scriptId = "kakao-map-script";
    if (document.getElementById(scriptId)) {
      console.log("✅ Kakao Maps 스크립트가 이미 추가됨");
      resolve(true);
      return;
    }

    console.log("🗺️ Kakao Maps 스크립트 추가 중...");
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=38cfbefdbcd80be8020db479e06e6cd4&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (window.kakao) {
        console.log("✅ Kakao Maps 스크립트 로드 완료");
        window.kakao.maps.load(() => {
          isScriptLoaded.value = true;
          resolve(true);
        });
      }
    };
    script.onerror = (error) => {
      console.error("❌ Kakao Maps 로드 실패:", error);
      reject(error);
    };

    document.head.appendChild(script);
  });
};

// ✅ 지도 초기화 함수
const initializeMap = () => {
  if (!isScriptLoaded.value || !mapRef.value) {
    console.warn("⚠️ Kakao Maps API가 아직 로드되지 않음.");
    return;
  }

  const latitude = props.mapy;
  const longitude = props.mapx;

  if (isNaN(latitude) || isNaN(longitude)) {
    console.error("⚠️ 지도 좌표가 유효하지 않음:", { latitude, longitude });
    return;
  }

  const position = new window.kakao.maps.LatLng(latitude, longitude);
  const options = { center: position, level: 3 };
  const map = new window.kakao.maps.Map(mapRef.value, options);

  if (props.title) {
    const marker = new window.kakao.maps.Marker({ position });
    marker.setMap(map);

    const overlayContent = `
      <div class="text-center drop-shadow-md">
        <div class="bg-white px-5 py-1 rounded-md border-blue-500 border text-lg relative translate-y-1">${props.title}</div>
        <i class="bi bi-caret-down-fill text-blue-500 text-3xl"></i>
      </div>
    `;
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position,
      content: overlayContent,
    });

    customOverlay.setMap(map);
  }
};

// ✅ Vue Lifecycle Hook
onMounted(async () => {
  try {
    await loadKakaoScript();
    initializeMap();
  } catch (error) {
    console.error("❌ Kakao Maps 로드 실패:", error);
  }
});

// ✅ 스크립트가 로드되면 지도 초기화
watch(isScriptLoaded, (loaded) => {
  if (loaded) initializeMap();
});
</script>

<template>
  <div ref="mapRef" class="h-[400px] w-full">
    <p v-if="!isScriptLoaded" class="text-center text-gray-500">지도 로딩 중...</p>
  </div>
</template>

