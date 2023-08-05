import baseRequest from "./interceptor";

export const getUsage = async () => {
  console.log("GET USAGE")
  const res = await baseRequest({
    url: `/api/v1/device/usage`,
    method: "GET",
  });
  console.log(res)

  return res;
};