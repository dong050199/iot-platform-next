import baseRequest from "./interceptor";

export const createDevice = async (data: any) => {
  const res = await baseRequest({
    url: `/api/v1/device`,
    method: "POST",
    data,
  });
  return res;
};

export const updateDevice = async (data: any) => {
  const res = await baseRequest({
    url: `/api/v1/device/${data.device_id}`,
    method: "PUT",
    data: data,
  });
  return res;
};

export const getListDevice = async (data:any) => {
	const res = await baseRequest({
		url: `/api/v1/device/list`,
		method: 'POST',
		data: data?.filter,
	});
	return res;
};

export const deleteDevice = async (id:number) => {
	const res = await baseRequest({
		url: `/api/v1/device/${id}`,
		method: 'DELETE',
	});
	return res;
};