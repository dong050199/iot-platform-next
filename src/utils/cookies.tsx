import Cookies from "js-cookie";
import { COOKIES } from "../constants/cookies";
import { IUser } from "../interfaces/userProfile";
import { FC } from "react";

export const getAccessToken = () => Cookies.get(COOKIES.ACESS_TOKEN);
// token set from backend service
export const removeAccessToken = () => Cookies.remove(COOKIES.ACESS_TOKEN);
// access token can set from backend service or frontend service cause we have the refresh token
export const setAccessToken = (token: string) => {
  removeAccessToken();
  Cookies.set(COOKIES.ACESS_TOKEN, token);
};

// get from cookie because ... I din't have any idea ...
export const getUserInfoFromCookie = () => {
  const email = Cookies.get(COOKIES.USER_EMAIL);
  const name = Cookies.get(COOKIES.USER_FULL_NAME);
  return {
    email,
    name,
  };
};

export const setUserInfoToCookie = (props: any) => {
  removeUserInfoFromCookie();
  Cookies.set(COOKIES.USER_EMAIL, props.email);
  Cookies.set(COOKIES.USER_FULL_NAME, props.name);
  return;
};

export const removeUserInfoFromCookie = () => {
  Cookies.remove(COOKIES.USER_EMAIL);
  Cookies.remove(COOKIES.USER_FULL_NAME);
  return;
};
