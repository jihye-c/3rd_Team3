import {defineStore} from 'pinia';
import {ref, onMounted} from 'vue';
import type User from '@/types/User';
import {userLogin, getUserInfo, userLogout} from '@/apis/auth';
import {userRegister, updateUser, createScrapPost} from '@/apis/userService';
import type UserRegisterForm from '@/types/UserRegisterForm';
import type { UserFullName } from '@/types/User';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));
  const isAuthenticated = ref<boolean>(!!token.value);

  const login = async (email: string, password: string) => {
    try {
      const userData = await userLogin(email, password);
      user.value = userData;
      token.value = localStorage.getItem('token');
      isAuthenticated.value = true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const fetchUser = async () => {
    try {
      if (!user.value || !user.value._id) throw new Error('유저 정보가 없습니다.');
      const userData = await getUserInfo(user.value._id);
      user.value = userData;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      // logout();
    }
  };

  const register = async (formData: UserRegisterForm) => {
    try {
      const newUser = await userRegister(formData);
      console.log('new user : ', newUser);
      //스크랩 포스트 생성
      await login(newUser.email, formData.password);
      const scrapId = await createScrapPost(newUser._id);
      console.log('scrap id : ', scrapId);

      if (typeof newUser.fullName !== 'string') return
      const prevFullName = JSON.parse(newUser.fullName);
      const updateForm = {
        ...prevFullName,
        scrapId: scrapId,
      };
      const updatedUser = await updateUser(updateForm);
      console.log('updated user : ', updatedUser);
      user.value = updatedUser;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const updateUserInfo = async (formData: UserFullName) => {
    try {
      const updatedUser = await updateUser(formData);
      user.value = updatedUser;
      return updatedUser;
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userImage');

    userLogout();
  };

  // 자동 로그인 처리
  // onMounted(async () => {
  //   if (token.value) {
  //     await fetchUser();
  //   }
  // });

  return {
    user,
    token,
    isAuthenticated,
    login,
    fetchUser,
    register,
    updateUserInfo,
    logout,
  };
});
