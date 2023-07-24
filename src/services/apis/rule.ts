import baseRequest from "./interceptor";

export const createRule = async (data: any) => {
  const res = await baseRequest({
    url: `/api/v1/rule`,
    method: "POST",
    data,
  });
  return res;
};

export const updateRule = async (data: any) => {
  const res = await baseRequest({
    url: `/api/v1/rule/${data.device_id}`,
    method: "PUT",
    data: data,
  });
  return res;
};

export const getListRule = async (data:any) => {
	const res = await baseRequest({
		url: `/api/v1/rule/list`,
		method: 'POST',
		data: data?.filter,
	});
	return res;
};


export const getListDevicesRule = async (data:any) => {
	const res = await baseRequest({
		url: `/api/v1/rule/devices`,
		method: 'POST',
		data: data?.filter,
	});
	return res;
};


export const deleteRule = async (id:number) => {
	const res = await baseRequest({
		url: `/api/v1/rule/${id}`,
		method: 'DELETE',
	});
	return res;
};