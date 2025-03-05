import {getGeolocationAddress} from '@/apis/userService';
import type {UserAddress} from '@/types/User';
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useUserStore = defineStore('user', () => {
  const storedAddress = localStorage.getItem('userAddress');
  const userLocation = ref<UserAddress | null>(storedAddress ? JSON.parse(storedAddress) : null);

  //유저 위치 정보 조회
  const getUserAddress = async (location: {latitude: number; longitude: number}) => {
    try {
      const data = await getGeolocationAddress(location);
      const address = data.documents[0].region_3depth_name;
      const latitude = data.documents[0].y;
      const longitude = data.documents[0].x;
      const newAddress = {address, latitude, longitude};
      localStorage.setItem('userAddress', JSON.stringify(newAddress));
      userLocation.value = newAddress;
    } catch (e) {
      console.log(e);
    }
  };

  //유저 위치정보 업데이트
  const updateUserAddress = (newAddress: UserAddress |null) => {
    localStorage.setItem('userAddress', JSON.stringify(newAddress));
    userLocation.value = newAddress;
  };
  return {
    userLocation,
    getUserAddress,
    updateUserAddress,
  };
});
