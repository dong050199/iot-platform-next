import Cookies from 'js-cookie';
import { COOKIES } from '../constants/cookies';

export const getAccessToken = () => Cookies.get(COOKIES.ACESS_TOKEN);
// token set from backend service
export const removeAccessToken = () => Cookies.remove(COOKIES.ACESS_TOKEN);
// access token can set from backend service or frontend service cause we have the refresh token
export const setAccessToken = (token:string) => Cookies.set(COOKIES.ACESS_TOKEN, token);


// refresh token use for get access token if it expired before refresh token expires
export const getRefreshToken = () => Cookies.get(COOKIES.REFRESH_TOKEN);
export const removeRefreshToken = () => Cookies.remove(COOKIES.REFRESH_TOKEN);
// the fist time when login with oauth set refresh token and access token to cookies.
export const setRefreshToken = (token:string) => Cookies.set(COOKIES.REFRESH_TOKEN, token);

export const getUserInfo = () => Cookies.get(COOKIES.USER_INFO);
// get from cookie because ... I din't have any idea ...
export const removeUserInfo = () => Cookies.remove(COOKIES.USER_INFO);
export const setUserInfo = (user:any) => Cookies.set(COOKIES.USER_INFO, user);