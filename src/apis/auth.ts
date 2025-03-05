import type User from '@/types/User';
import axiosApi from '@/utils/axiosConfig';
import axios from 'axios';

const apiRoot = import.meta.env.VITE_PROGRAMMERS_API_ROOT;
const kakaoApi = import.meta.env.VITE_KAKAO_REST_BASE_API_URL
const kakaoApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;

export async function userLogin(email: string, password: string): Promise<User> {
  const res = await axiosApi.post(`${apiRoot}/login`, {email, password});
  if (res.status !== 200) {
    throw new Error('로그인 에러 : ' + res.status);
  }
  if (res.data?.token) {
    localStorage.setItem('token', res.data.token);
    return res.data.user;
  } else {
    throw new Error('로그인 에러 : 토큰이 존재하지 않습니다.');
  }
}

export async function getUserInfo(id:string):Promise<User>{ //return 어떻게 오는지 봐야함
  const res = await axiosApi.post(`${apiRoot}/users/${id}`);
  if(res.status !== 200){
    throw new Error('유저 정보를 가져오던 중 에러가 발생했습니다. : '+ res.status);
  }
  return res.data
}

export async function userLogout(){
  await axiosApi.post(`${apiRoot}/logout`);
}

// 좌표를 주소로 받아오는 API
export async function getGeolocationAddress(locations: { latitude: number; longitude: number; }){
  const res = await axios.get(`${kakaoApi}`,{
    headers:{
      Authorization:`KakaoAK ${kakaoApiKey}`
    },
    params:{
      x: locations.longitude,
      y: locations.latitude
    }
  });
  if(res.status !== 200){
    throw new Error('주소를 받아오지 못했습니다. : '+ res.status);
  }
  return res.data
}
