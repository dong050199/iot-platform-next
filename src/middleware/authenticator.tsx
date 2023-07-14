import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import FullScreenLoader from "../components/screenLoader/screenLoader";
import { NextRouter, useRouter } from "next/router";
import { COOKIES } from "../constants/cookies";
import { getAccessToken } from "../utils/cookies";
import Login from "../pages/login";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  return children;
};

export default AuthMiddleware;
