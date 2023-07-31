import baseRequest from "./interceptor";

export const getUsage = async () => {
  const res = await baseRequest({
    url: `/api/v1/device/usage`,
    method: "GET",
  });
  return res;
};