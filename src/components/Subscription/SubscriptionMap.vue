<script setup lang="ts">
  import {defineProps, onMounted, defineModel, ref} from 'vue';
  import type {MapData} from '@/types/kakao';

  const props = defineProps<{
    address?: string;
  }>();

  // lat, lng, level 등의 기본값을 설정
  const mapData = defineModel<MapData>('mapData', {
    default: {
      bounds: {left: 0, top: 0, right: 0, bottom: 0},
      lng: 126.97672186606,
      lat: 37.576030700103,
      level: 3,
    },
  });

  const map = ref<any>(null);

  // 카카오맵 SDK 스크립트 로드 (키워드 검색을 위해 libraries=services 추가)
  const loadScript = () => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=a2c050fda93b27dcfcc9c1f03048fb11&autoload=false&libraries=services`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        loadMap();
        // prop으로 전달받은 주소가 있다면 키워드 검색 실행
        if (props.address) {
          searchByKeyword(props.address);
        }
      });
    };
    document.head.appendChild(script);
  };

  // 지도 생성 함수
  const loadMap = () => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map'); // 지도 컨테이너 DOM
      if (container) {
        const options = {
          center: new window.kakao.maps.LatLng(mapData.value.lat, mapData.value.lng),
          level: mapData.value.level,
        };
        map.value = new window.kakao.maps.Map(container, options);
      } else {
        console.error('지도 컨테이너를 찾을 수 없습니다.');
      }
    } else {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
    }
  };

  // 키워드 검색 및 마커 표시 함수
  const searchByKeyword = (keyword: string) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.error('Kakao Maps API services가 로드되지 않았습니다.');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (result: any, status: any, pagination: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        for (let i = 0; i < result.length; i++) {
          displayMarker(result[i]);
          bounds.extend(new window.kakao.maps.LatLng(result[i].y, result[i].x));
        }
        if (map.value) {
          map.value.setBounds(bounds);
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        const center = map.value.getCenter();
        const infowindow = new window.kakao.maps.InfoWindow({zIndex: 1});
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">검색 결과가 없습니다.</div>`,
        );
        infowindow.setPosition(center);
        infowindow.open(map.value);
      } else {
        console.error('키워드 검색 실패:', status);
      }
    });
  };

  // 마커 표시 함수
  const displayMarker = (place: any) => {
    const marker = new window.kakao.maps.Marker({
      map: map.value,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    window.kakao.maps.event.addListener(marker, 'click', () => {
      const infowindow = new window.kakao.maps.InfoWindow({zIndex: 1});
      infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
      infowindow.open(map.value, marker);
    });
  };

  onMounted(() => {
    if (!window.kakao) {
      loadScript();
    } else {
      loadMap();
      if (props.address) {
        searchByKeyword(props.address);
      }
    }
  });
</script>

<template>
  <div id="map"></div>
</template>

<style scoped></style>
