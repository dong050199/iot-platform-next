import axios from "axios";
import { getAccessToken } from "../../utils/cookies";
import { PATH } from "../../constants/path";
import { useRouter } from "next/router";

const baseRequest = axios.create();

baseRequest.interceptors.request.use(
  (config) => {
    console.log(config)
    config.baseURL = process.env.NEXT_PUBLIC_AUTHENTICATION_SERVICE_URL || '';
    return config;
  },
  (error) => {
    console.log(error)
    return error;
  }
);

baseRequest.interceptors.response.use(
  (response) => {
    console.log("this is the response",response)
    return response
  },
  (error) => {
    return {
      errorMessage: error?.response?.data?.message,
    };
  }
);
export default baseRequest;
