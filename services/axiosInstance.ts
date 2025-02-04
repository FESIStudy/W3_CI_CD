import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000, // 요청 타임아웃 설정 (5초)
  headers: { "Content-Type": "application/json" },
});

// 에러 일괄처리를 위한 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      console.log("Internal Server Error");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
