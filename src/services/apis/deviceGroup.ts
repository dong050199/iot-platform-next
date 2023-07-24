import baseRequest from "./interceptor";

export const createDeviceGroup = async (data: any) => {
  const res = await baseRequest({
    url: `/api/v1/devices`,
    method: "POST",
    data,
  });
  return res;
};

export const updateDeviceGroup = async (data: any) => {
  const res = await baseRequest({
    url: `/api/v1/devices/${data.group_id}`,
    method: "PUT",
    data: data,
  });
  return res;
};

export const getListDevices = async (data:any) => {
	const res = await baseRequest({
		url: `/api/v1/devices/list`,
		method: 'POST',
		data: data?.filter,
	});
	return res;
};

export const deleteDeviceGroup = async (id:number) => {
	const res = await baseRequest({
		url: `/api/v1/devices/${id}`,
		method: 'DELETE',
	});
	return res;
};