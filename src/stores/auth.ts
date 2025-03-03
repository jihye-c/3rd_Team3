import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import type User from '@/types/User';
import { userLogin, getUserInfo } from '@/apis/auth';
import { userRegister, updateUser, withdrawalUser } from '@/services/userService';

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
      const userData = await getUserInfo();
      user.value = userData;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      logout();
    }
  };

  const register = async (formData: FormData) => {
    try {
      const newUser = await userRegister(formData);
      user.value = newUser;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const updateUserInfo = async (formData: FormData) => {
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
  };

  const withdraw = async () => {
    try {
      const result = await withdrawalUser();
      logout();
      return result;
    } catch (error) {
      console.error('Withdrawal failed:', error);
      throw error;
    }
  };

  // 자동 로그인 처리
  onMounted(async () => {
    if (token.value) {
      await fetchUser();
    }
  });

  return {
    user,
    token,
    isAuthenticated,
    login,
    fetchUser,
    register,
    updateUserInfo,
    logout,
    withdraw
  };
});
