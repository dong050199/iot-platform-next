import baseRequest from "./interceptor";

export const getUserInfo = async() => {
	const res = await baseRequest({
		url: `/api/v1/user/info`,
		method: 'GET',
	});
	return res;
}

export const getAccessTokenRedirect = async(code:string) => {
	console.log("getAccessTokenRedirect")
	const res = await baseRequest({
		url: `/api/v1/user/login`,
		method: 'GET',
		params: code,
	});
	console.log(res)
	return res;
}
