import baseRequest from "./interceptor";

export const deleteDeviceDatasource = async (id: number) => {
  const res = await baseRequest({
    url: `/api/v1/dashboard/datasource/${id}`,
    method: "DELETE",
  });
  return res;
};

export const addDeviceDatasource = async (id: number) => {
  const res = await baseRequest({
    url: `/api/v1/dashboard/datasource/${id}`,
    method: "POST",
  });
  return res;
};

export const createUserOrgs = async (data: any) => {
  const res = await baseRequest({
    url: `/api/v1/dashboard`,
    method: "POST",
    data: data,
  });
  return res;
};

export const getListDeviceDataSource = async (data: any) => {
  const res = await baseRequest({
    url: `/api/v1/dashboard/datasource/list`,
    method: "POST",
    data: data?.filter,
  });
  return res;
};

export const getListDeviceAddDatasource = async (data: any) => {
    const res = await baseRequest({
      url: `/api/v1/dashboard/datasource/select`,
      method: "POST",
      data: data?.filter,
    });
    return res;
  };
  
