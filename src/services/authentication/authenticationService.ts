import baseRequest from './interceptor';

export const registerUser = async(data:any) => {
	const res = await baseRequest({
		url: `/api/v1/user/register`,
		method: 'POST',
		data: data,
	});
	return res;
}

export const loginUser = async(data:any) => {
	const res = await baseRequest({
		url: `/api/v1/user/login`,
		method: 'POST',
		data: data,
	});
	return res;
}