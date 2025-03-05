<script setup lang="ts">
  import type {MapData} from '@/types/kakao';
  import {onMounted, defineModel, ref} from 'vue';

  //lat은 위도 (latitude), lng은 경도 (longtitude)
  const mapData = defineModel<MapData>('mapData', {
    default: {
      bounds: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      lng:126.97672186606,
      lat:37.576030700103,
      level: 3,
    },
  });
  const isMapChange = defineModel('isMapChange');
  const map = ref(null);

  const loadScript = () => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=a2c050fda93b27dcfcc9c1f03048fb11&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(loadMap);
    };
    document.head.appendChild(script);
  };
  const loadMap = () => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 참조
      const options = {
        center: new window.kakao.maps.LatLng(mapData.value.lat, mapData.value.lng), // 중심 좌표
        level: mapData.value.level,
      };

      map.value = new window.kakao.maps.Map(container, options); // 지도 생성
      changeMapData(map.value);

      window.kakao.maps.event.addListener(map.value, 'bounds_changed', () => {
        changeMapData(map.value);
      });
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

    isMapChange.value = true;
  };

  onMounted(() => {
    if (!window.kakao) {
      loadScript();
    } else {
      loadMap();
    }
  });
</script>

<template>
  <div id="map" class="w-full h-full"></div>
</template>

<style scoped></style>
