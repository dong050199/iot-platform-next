import baseRequest from "./interceptor";

export const getUserInfo = async() => {
	const res = await baseRequest({
		url: `/api/v1/user/info`,
		method: 'GET',
	});
	return res;
}