import type {UserFullName} from '@/types/User';
import type User from '@/types/User';
import type UserRegisterForm from '@/types/UserRegisterForm';
import axiosApi from '@/utils/axiosConfig';

const apiRoot = import.meta.env.VITE_PROGRAMMERS_API_ROOT;

export async function userRegister(formData: UserRegisterForm): Promise<User> {
  const fullName = JSON.stringify({
    name: formData.name,
    nickname: formData.nickname,
  });
  const signUpRes = await axiosApi.post(`${apiRoot}/signup`, {
    email: formData.email,
    password: formData.password,
    fullName: fullName,
  });
  if (signUpRes.status !== 200) {
    throw new Error('Post Error : ' + signUpRes.status);
  }
  return signUpRes.data.user;
}
export async function updateUser(fullName: UserFullName): Promise<User> {
  const response = await axiosApi.put<User>(`${apiRoot}/settings/update-user`, {"fullName": JSON.stringify(fullName)});
  if (response.status !== 200) {
    throw 'state : ' + response.status;
  }
  return response.data; //이것도 타입 검증 필요
}
export async function checkUserEmail(email: string): Promise<boolean> {
  try {
      const userList = await axiosApi.get<User[]>(`${apiRoot}/users/get-users`);
    if (userList.status !== 200) {
      throw '유저 목록을 불러오는데 실패했습니다. : ' + userList.status;
    }
    const users = userList.data;
    return !users.some(user => user.email === email);
  } catch (err) {
    console.log('유저 목록을 불러오는데 실패했습니다. : ', err);
    return false;
  }
}
export async function createScrapPost(id: string): Promise<string> {
  const scrapTitle = JSON.stringify({
    id: id,
    scrap: [],
  });
  const res = await axiosApi.post(`${apiRoot}/posts/create`, {
    title: scrapTitle,
    channelId: '67bfdc61ff075444a9c22ebd', //scrap 채널
  });
  return res.data._id;
}