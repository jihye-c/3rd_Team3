import {getUserInfo} from '@/apis/auth';
import {
  deleteFollow,
  deleteUser,
  getGeolocationAddress,
  postFollow,
  updateInfo,
  updatePasswordInfo,
  updateUserProfile,
} from '@/apis/userService';
import {address_select_items} from '@/config/config';
import type User from '@/types/User';
import type {UserAddress} from '@/types/User';
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useUserStore = defineStore('user', () => {
  const storedAddress = localStorage.getItem('userAddress');
  const userLocation = ref<UserAddress | null>(storedAddress ? JSON.parse(storedAddress) : null);

  const userInfo = ref();
  const followerInfo = ref([]);
  const followingInfo = ref([]);
  const userProfileImage = ref<string>('');

  //유저 위치 정보 조회
  const getUserAddress = async (location: {latitude: number; longitude: number}) => {
    try {
      const data = await getGeolocationAddress(location);
      const address = data.documents[0].region_2depth_name;
      const latitude = data.documents[0].y;
      const longitude = data.documents[0].x;
      const filterAddress = address_select_items.some((item) => item.address === address);
      if (filterAddress) {
        const newAddress = {address, latitude, longitude};
        localStorage.setItem('userAddress', JSON.stringify(newAddress));
        userLocation.value = newAddress;
      } else {
        const newAddress = address_select_items[0];
        localStorage.setItem('userAddress', JSON.stringify(newAddress));
        userLocation.value = newAddress;
        alert('현재 위치하고 계신 곳은 서울이 아닙니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getUser = async (id: string) => {
    try {
      followerInfo.value = [];
      followingInfo.value = [];
      const data = await getUserInfo(id);
      const fullName = JSON.parse(data.fullName);
      userInfo.value = {...data, fullName};
      if (userInfo.value.image) {
        localStorage.setItem('userImage', userInfo.value.image);
      }
      if (data.followers.length > 0) {
        for (const item of data.followers) {
          const userData = await getUserInfo(item.follower);
          const fullName = JSON.parse(userData.fullName);
          followerInfo.value.push({...userData, fullName, id: userData._id});
        }
      }
      if (data.following.length > 0) {
        for (const item of data.following) {
          const userData = await getUserInfo(item.user ?? item.follower);
          const fullName = JSON.parse(userData.fullName);
          console.log(fullName)

          followingInfo.value.push({...userData, fullName, id: userData._id});
        }
      }

    } catch (e) {
      console.log(e);
    }
  };
  const getUserInfomation = async (id: string) => {
    try {

      const data = await getUserInfo(id);
      userProfileImage.value = data.image
    } catch (e) {
      console.log(e);
    }
  };
  const postUserProfile = async (formData: FormData) => {
    try {
      const data = await updateUserProfile(formData);
      localStorage.setItem('userImage', data.image);
      userProfileImage.value = data.image;
    } catch (e) {
      console.log(e);
    }
  };

  const postFollowUser = async (id: string | string[]) => {
    try {
      const data = await postFollow(id);
      await getUser(data.user);
      followerInfo.value.push({...userData});
    } catch (e) {
      console.log(e);
    }
  };
  const deleteFollowUser = async (id: string | string[]) => {
    try {
      const data = await deleteFollow(id);
      await getUser(data.user);
    } catch (e) {
      console.log(e);
    }
  };
  const updateUserInfo = async (payload: {fullName: string}) => {
    try {
      const data = await updateInfo(payload);
      const fullName = JSON.parse(data.fullName);
      userInfo.value = {...data, fullName};
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const changePassword = async (payload: {password: string}) => {
    try {
      const data = await updatePasswordInfo(payload);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteAccount = async (id: string |string []) => {
    try {
      const data = await deleteUser(id);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  //유저 위치정보 업데이트
  const updateUserAddress = (newAddress: UserAddress | null) => {
    localStorage.setItem('userAddress', JSON.stringify(newAddress));
    userLocation.value = newAddress;
  };

  return {
    userLocation,
    userInfo,
    followerInfo,
    userProfileImage,
    followingInfo,
    getUserAddress,
    updateUserAddress,
    getUser,
    postUserProfile,
    postFollowUser,
    deleteFollowUser,
    updateUserInfo,
    changePassword,
    getUserInfomation,
    deleteAccount,
  };
});
