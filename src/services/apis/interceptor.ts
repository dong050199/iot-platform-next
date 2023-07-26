import axios from "axios";
import { getAccessToken, getUserInfoFromCookie, removeAccessToken, removeUserInfoFromCookie } from "../../utils/cookies";
import { PATH } from "../../constants/path";
import { useRouter } from "next/router";
import { removeAllListeners } from "process";

const baseRequest = axios.create();

baseRequest.interceptors.request.use(
  (config) => {
    const token = getAccessToken() 
    if (!!!token) {
      const router = useRouter();
      router.push(PATH.LOGIN)
    };
    config.headers.Authorization = `Bearer ${token}`;
    config.baseURL = process.env.NEXT_PUBLIC_AUTHENTICATION_SERVICE_URL || '';
    config.method = config.method || 'GET';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseRequest.interceptors.response.use(
  (response) => {
    if (response?.status === 401) {
      const router = useRouter();
      router.push(PATH.LOGIN)
    }
    return response
  },
  (error) => {
    if ( error?.response?.status === 401) {
      removeAccessToken();
      removeUserInfoFromCookie();
    }
    return {
      errorMessage: error?.message,
      quanQUE: error?.status_code
    };
  }
);
export default baseRequest;
