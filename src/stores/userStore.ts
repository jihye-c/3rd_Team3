import {getUserInfo} from '@/apis/auth';
import {deleteFollow, deleteUser, getGeolocationAddress, postFollow, updateInfo, updatePasswordInfo, updateUserProfile} from '@/apis/userService';
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
  const userProfileImage = ref<string>("")

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
  const getUser = async (id: string) => {
    try {
      const data = await getUserInfo(id);
      const fullName = JSON.parse(data.fullName);
      userInfo.value = {...data, fullName};
      followerInfo.value = []
      followingInfo.value = []
      if(userInfo.value.image){
        localStorage.setItem('userImage', userInfo.value.image)
      }
      if (data.followers.length > 0) {
        for (const item of data.followers) {
          const userData = await getUserInfo(item.follower);
          const fullName = JSON.parse(userData.fullName);
          followerInfo.value.push({...userData, fullName,id:userData._id});
        }
      }
      if (data.following.length > 0) {
        for (const item of data.following) {
          const userData = await getUserInfo(item.user ?? item.follower);
          const fullName = JSON.parse(userData.fullName);
          followingInfo.value.push({...userData, fullName,id:userData._id});
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const postUserProfile = async (formData: FormData) => {
    try {
      const data = await updateUserProfile(formData);
      localStorage.setItem('userImage', data.image)

      userProfileImage.value = data.image
      console.log(data);
    } catch (e) {
      console.log(e);
    }


  };

  const postFollowUser = async (id:string) =>{
    try{
    const data = await postFollow(id)
    console.log(data);
    await getUser(data.user)
  }catch(e){
    console.log(e);
  }
  }
  const deleteFollowUser = async (id:string) =>{
    try{
    const data = await deleteFollow(id)
    console.log(data);
    await getUser(data.user)
  }catch(e){
    console.log(e);
  }
  }
  const updateUserInfo = async (payload:{fullName:string}) =>{
    try{
    const data = await updateInfo(payload)
    const fullName = JSON.parse(data.fullName);
    userInfo.value = {...data, fullName};
    console.log(data);
  }catch(e){
    console.log(e);
  }
  }
  const changePassword = async (payload:{password:string}) =>{
    try{
    const data = await updatePasswordInfo(payload)
    console.log(data);
  }catch(e){
    console.log(e);
  }
  }
  const deleteAccount = async (id:string) =>{
    try{
    const data = await deleteUser(id)
    console.log(data);
  }catch(e){
    console.log(e);
  }
  }
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
    deleteAccount
  };
});
