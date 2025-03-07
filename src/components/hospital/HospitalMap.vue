<script setup lang="ts">
  import {useUserStore} from '@/stores/userStore';
  import type {MapData} from '@/types/kakao';
  import {onMounted, ref, nextTick} from 'vue';
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
    loadHospital: (
      mapData: MapData,
      page: number, //1부터 시작
      hospitalType?: string[],
      symptomsQuery?: string[],
    ) => void;
  }>();

  const loadScript = () => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(loadMap);
    };
    document.head.appendChild(script);
  };
  const loadMap = () => {
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
        changeMapData(map.value);
        nextTick(() => {
          props.loadHospital(mapData.value, 1);
        });
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
  const changeMapData = (map) => {
    const center = map.getCenter();
    const level = map.getLevel();
    const bounds = map.getBounds();
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

  onMounted(() => {
    if (!window.kakao) {
      loadScript();
    } else {
      loadMap();
    }
  });
  const listLoad = () => {
    loading.value = true;
    props.loadHospital(mapData.value, 1);
    setTimeout(() => {
      loading.value = false;
      isMapChange.value = false;
    }, 800);
  };
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
