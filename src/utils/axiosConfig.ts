import axios from 'axios';

// Axios 인스턴스 생성
const axiosApi = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

// 요청 인터셉터 설정 (토큰 추가)
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정 (토큰 만료 처리)
axiosApi.interceptors.response.use((response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 404) {
      console.warn("토큰이 만료되었습니다.");
      localStorage.removeItem("token");
    }
  }
);


export default axiosApi;
