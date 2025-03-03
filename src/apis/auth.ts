import type User from '@/types/User';
import axiosApi from '@/utils/axiosConfig';

const apiRoot = import.meta.env.VITE_PROGRAMMERS_API_ROOT;

export async function userLogin(email: string, password: string): Promise<User> {
  const res = await axiosApi.post(`${apiRoot}/login`, {email, password});
  if (res.status !== 200) {
    throw new Error('Login Error : ' + res.status);
  }
  if (res.data?.token) {
    localStorage.setItem('token', res.data.token);
    console.log('default res : ', res)
    return res.data.user;
  } else {
    throw new Error('Login Error : no token');
  }
}

export async function getUserInfo(): Promise<User> {
  const response = await axiosApi.get<User>('/auth/loginInfo');
  // console.log(response);
  if (response.status !== 200) {
    throw new Error('state error : ' + response.status);
  }
  return response.data;
}

export async function postScrap(id:string){

    const scrapTitle = JSON.stringify({
      id: id,
      scrap: [],
    });
    const res = await axiosApi.post(`${apiRoot}/posts/create`, {
      title: scrapTitle,
      channelId: '67bfdc61ff075444a9c22ebd',
    });

    return res;
}

export async function userSignUp(
  email: string,
  password: string,
  name: string,
  nickname: string,
): Promise<User | null> {
  try {
    const fullName = JSON.stringify({
      name: name,
      nickname: nickname,
    });
    const signUpRes = await axiosApi.post(`${apiRoot}/signup`, {
      email: email,
      password: password,
      fullName: fullName,
    });
    if (signUpRes.status !== 200) {
      throw new Error('Post Error : ' + signUpRes.status);
    }
 
    console.log('signUp response : ', signUpRes);
    const user = signUpRes.data.user;

    await userLogin("test@email.com", "abcd1234");
    await postScrap("test@email.com");
    
    return signUpRes.data;

  } catch (err) {
    console.log('회원가입 시도 중 문제가 발생했습니다.', err);
    return null;
  }
}
