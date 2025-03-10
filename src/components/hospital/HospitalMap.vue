<script setup lang="ts">
  import {useUserStore} from '@/stores/userStore';
  import type {FullHospitalRes} from '@/types/hospitalType';
  import type {MapData} from '@/types/kakao';
  import {onMounted, ref, nextTick, watch, watchEffect} from 'vue';
  const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

  //lat은 위도 (latitude), lng은 경도 (longtitude)
  const mapData = defineModel<MapData>('mapData', {
    default: {
      bounds: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      lng: 126.97672186606,
      lat: 37.576030700103,
      level: 3,
    },
  });
  const isMapChange = defineModel('isMapChange');
  const loading = ref(false);
  const map = ref(null);
  const prevMapData = ref<MapData>({
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
  const props = defineProps<{
    loadHospital: () => Promise<void>;
    hospitalList: FullHospitalRes;
    openDetail: (id: string) => void;
  }>();

  const loadScript = () => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(loadMap);
    };
    document.head.appendChild(script);
  };
  const loadMap = async () => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      if (container) {
        const userStore = useUserStore();
        if (userStore.userLocation) {
          mapData.value.lat = userStore.userLocation.latitude;
          mapData.value.lng = userStore.userLocation.longitude;
        }
        const options = {
          center: new window.kakao.maps.LatLng(mapData.value.lat, mapData.value.lng), // 중심 좌표
          level: mapData.value.level,
        };

        map.value = new window.kakao.maps.Map(container, options); // 지도 생성
        if (map.value) {
          await changeMapData(map.value);
          await props.loadHospital();
        }
        container.addEventListener('mousedown', () => {
          prevMapData.value = mapData.value;
        });
        window.kakao.maps.event.addListener(map.value, 'bounds_changed', () => {
          changeMapData(map.value);
        });
      }
    } else {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
    }
  };

  const changeMapData = async (map) => {
    if (
      mapData.value.bounds.bottom <= 0 ||
      mapData.value.bounds.top <= 0 ||
      mapData.value.bounds.left <= 0 ||
      mapData.value.bounds.right <= 0
    ) {
      if (map.value) {
        await map.value.setCenter(
          new window.kakao.maps.LatLng(mapData.value.lat, mapData.value.lng),
        );
      }
    }

    const center = await map.getCenter();
    const level = await map.getLevel();
    const bounds = await map.getBounds();

    mapData.value = {
      bounds: {
        left: bounds.ha,
        right: bounds.oa,
        top: bounds.pa,
        bottom: bounds.qa,
      },
      lng: center.La,
      lat: center.Ma,
      level: level,
    };

    const threshold = 0.0015;
    if (
      Math.abs(prevMapData.value.lng - mapData.value.lng) > threshold ||
      Math.abs(prevMapData.value.lat - mapData.value.lat) > threshold
    ) {
      if (!isMapChange.value) {
        isMapChange.value = true;
      }
    }
  };

const setMarker = () => {
  const locations = props.hospitalList.data?.map((data) => ({
    lng: Number(data.mapx),
    lat: Number(data.mapy),
    id: data.id,
    name: data.name,
  }));

  const offset = 0.00003;
  const positionMap = new Map();

  locations?.forEach((loc) => {
    let newLat = loc.lat;
    let newLng = loc.lng;
    const key = `${newLat},${newLng}`; // 중복 체크 시 수정된 좌표 기준

    //지터링
    if (positionMap.has(key)) {
      const count = positionMap.get(key);
      newLat += offset * count;
      newLng += offset * 2 * count;
      positionMap.set(key, count + 1);
    } else {
      positionMap.set(key, 1);
    }

    const markerPosition = new window.kakao.maps.LatLng(newLat, newLng);

    // 기본 마커 추가
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      map: map.value,
    });

    console.log(`마커 추가: ${loc.name} (${newLat}, ${newLng})`);

    // 오버레이 추가
    const overlayId = `${loc.id}_overlay`;
    const content = `<div id="${overlayId}" class="bg-main-50 border border-main-400 text-main-400" style="opacity:0; transition: opacity 0.3s;">
      ${loc.name}
    </div>`;
    const overlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      yAnchor: 1.5,
    });
    overlay.setMap(map.value);

    setTimeout(() => {
      const overlayElement = document.getElementById(overlayId);
      if (overlayElement) {
        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
          overlayElement.style.opacity = '1';
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
          overlayElement.style.opacity = '0';
        });
      } else {
        console.warn(`오버레이 요소를 찾을 수 없음: ${overlayId}`);
      }
    }, 100);

    // 마커 클릭 이벤트 추가
    window.kakao.maps.event.addListener(marker, 'click', async () => {
      if (map.value) {
        await map.value.setCenter(markerPosition);
        props.openDetail(loc.id);
      }
    });
  });
};


  onMounted(async () => {
    if (!window.kakao) {
      loadScript();
      props.loadHospital();
    } else {
      loadMap();
    }
  });
  const listLoad = () => {
    loading.value = true;
    props.loadHospital();
    setTimeout(() => {
      loading.value = false;
      isMapChange.value = false;
    }, 800);
  };

  watch(
    () => props.hospitalList,
    () => {
      setMarker();
    },
  );
</script>

<template v-slot:actions>
  <div id="map" class="w-full h-full relative">
    <v-btn
      class="absolute z-10 top-11/12 left-1/2 bg-main-400"
      elevation="6"
      rounded="xl"
      size="large"
      v-show="isMapChange"
      :loading="loading"
      @click="listLoad"
      >현 지도에서 검색</v-btn
    >
  </div>
</template>

<style scoped>
  button.v-btn {
    transform: translateX(-50%);
    background: rgba(248, 154, 0, 0.65);
    backdrop-filter: blur(3px);
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  button.v-btn:hover {
    background: rgba(248, 154, 0, 0.95);
  }
</style>
