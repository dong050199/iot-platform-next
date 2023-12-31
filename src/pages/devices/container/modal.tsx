import {
  Box,
  Button,
  Grid,
  Paper,
  Divider,
  TextField,
  Typography,
  Stack,
  Autocomplete,
} from "@mui/material";
import * as Yup from "yup";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import {
  createDeviceGroup,
  deleteDeviceGroup,
  getListDevices,
  updateDeviceGroup,
} from "../../../services/apis/deviceGroup";
import { toastOptions } from "../../../utils/toast.options";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useRouter } from "next/router";
import { Modal } from "../../../components/modal";
import { result, values } from "lodash";
import { FilterBase } from "../../device-groups";
import { PAGINATION } from "../../../constants/pagination";
import {
  createDevice,
  deleteDevice,
  updateDevice,
} from "../../../services/apis/device";

export interface IAddDeviceModalProps {
  isOpen: boolean;
  handleOnClose?: any;
  isEdit: boolean;
  data: any;
  refetch?: any;
  setSnackBar?: any;
}

export const AddDeviceModal: FC<IAddDeviceModalProps> = ({
  isOpen,
  handleOnClose,
  isEdit,
  data,
  refetch,
  setSnackBar,
}) => {
  // clear snackbar
  useEffect(() => {
    if (isOpen) {
      setSnackBar({})
    }
  },[])


  const initialValues = {
    device_id: 0,
    profile_id: 0,
    group_id: 0,
    name: "",
    description: "",
    state: "",
    user_name: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      isEdit
        ? onUpdate({
            device_id: data.device_id,
            profile_id: data.profile_id,
            group_id: formik.values.group_id,
            name: values.name,
            description: values.description,
            state: values.state,
            user_name: values.user_name,
            password: values.password,
          })
        : onCreate({
            device_id: 0,
            profile_id: 0,
            group_id: formik.values.group_id,
            name: values.name,
            description: values.description,
            state: values.state,
            user_name: values.user_name,
            password: values.password,
          });
      refetch();
    },
    validationSchema: Yup.object().shape({
      group_id: Yup.number()
        .min(1, "Please select valid group")
        .required("Please select group of devices"),
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      user_name: Yup.string()
        .required("User name is require for device")
        .min(8, "User name must be at least 8 characters"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Please enter the password for this device"),
    }),
  });

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        device_id: data.device_id,
        profile_id: data.profile_id,
        group_id: data.group_id,
        name: data.name,
        description: data.description,
        state: data.state,
        user_name: data.user_name,
        password: data.password,
      });
    } else {
      formik.setValues(initialValues);
    }
  }, [data, isEdit]);


  const handleOnDeleteGroup = (id: number) => {
    const resp = deleteDevice(id).then((result) => {
      if (result.status !== 200) {
        setSnackBar({
          content: "Delete device failed",
          messageType: "error",
          timeToast: Date.now(),
        });
      } else {
        setSnackBar({
          content: "Delete device succeeded",
          messageType: "success",
          timeToast: Date.now(),
        });
      }
    });
  };

  const { mutate: onCreate, isLoading: loadingCreate } = useMutation(
    async (values: any) => {
      try {
        const response: any = await createDevice(values);
        if (response?.status !== 200) {
          setSnackBar({
            content: response?.errorContent || "Create device failed",
            messageType: "error",
            timeToast: Date.now(),
          });
          return false;
        } else {
          setSnackBar({
            content: "Create device succeeded",
            messageType: "success",
            timeToast: Date.now(),
          });
          refetch && refetch();
          handleOnClose();
          return true;
        }
      } catch (error: any) {
        setSnackBar({
          content: "Create device failed",
          messageType: "error",
          timeToast: Date.now(),
        });
        return false;
      }
    }
  );
  const [filter, setFilter] = useState<FilterBase>({
    page_size: PAGINATION.PAGE_SIZE,
    page_index: PAGINATION.PAGE,
    name: "",
    sort: PAGINATION.SORT_ASC,
  });

  const {
    data: dataGroupDevices,
    isFetching,
    refetch: refetchGroupDevices,
  } = useQuery(
    [`list-device-modal-device`],
    async () => {
      let response = await getListDevices({ filter });
      // if result not null set to map
      if (response.status == 200 && response.data.data.device_groups != null) {
        return response;
      }
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: onUpdate, isLoading: loadingUpdate } = useMutation(
    async (values: any) => {
      try {
        const response: any = await updateDevice(values);
        if (response?.status !== 200) {
          setSnackBar({
            content: response?.errorContent || "Update device failed",
            messageType: "error",
            timeToast: Date.now(),
          });
          return false;
        } else {
          setSnackBar({
            content: "Update device succeeded",
            messageType: "success",
            timeToast: Date.now(),
          });
          refetch && refetch();
          handleOnClose();
          return true;
        }
      } catch (error: any) {
        setSnackBar({
          content: "Update device failed",
          messageType: "error",
          timeToast: Date.now(),
        });
        return false;
      }
    }
  );

  const handleChangeInput = () => {
    refetchGroupDevices();
  };

  const handleSetFilter = (name: string) => {
    setFilter({
      page_size: PAGINATION.PAGE_SIZE,
      page_index: PAGINATION.PAGE,
      name: name,
      sort: PAGINATION.SORT_ASC,
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleOnClose}
      sx={{
        minWidth: 700,
        width: "auto",
        flexDirection: "column",
        position: "relative",
        maxWidth: "800px",
        maxHeight: "95vh",
      }}
    >
      {isEdit ? (
        <Typography variant="h5" sx={{ ml: "18px", fontWeight: "bold" }}>
          Update Device
        </Typography>
      ) : (
        <Typography variant="h5" sx={{ ml: "18px", fontWeight: "bold" }}>
          Create Device
        </Typography>
      )}
      <form onSubmit={formik.handleSubmit}>
        {isEdit ? (
          <></>
        ) : (
          <>
            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              options={dataGroupDevices?.data?.data?.device_groups || []}
              getOptionLabel={(option: any) => {
                return option.name;
              }}
              onChange={(event, data) => {
                formik.setFieldValue("group_id", data?.group_id || 0);
              }}
              onInputChange={(event, data) => {
                handleSetFilter(data || "");
              }}
              onKeyDown={(event) => {
                // search when enter key is pressed
                if (event.key === "Enter") {
                  handleChangeInput();
                }
              }}
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  sx={{
                    m: "20px",
                    width: "95%",
                  }}
                  error={Boolean(formik.errors.group_id)}
                  helperText={formik.errors.group_id}
                  type="text"
                  label="Select Device Group - Type and press Enter to Search..."
                  variant="filled"
                  {...params}
                />
              )}
            />
          </>
        )}
        <TextField
          sx={{
            m: "20px",
            width: "95%",
          }}
          autoComplete="new-password"
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Device Name"
          size="small"
          variant="filled"
        />
        <TextField
          sx={{
            m: "20px",
            width: "95%",
          }}
          autoComplete="new-password"
          error={Boolean(formik.errors.description)}
          helperText={formik.errors.description}
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Device Description"
          size="small"
          variant="filled"
        />
        <TextField
          sx={{
            m: "20px",
            width: "95%",
          }}
          autoComplete="new-password"
          error={Boolean(formik.errors.user_name)}
          helperText={formik.errors.user_name}
          type="text"
          name="user_name"
          value={formik.values.user_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="User Name"
          size="small"
          variant="filled"
        />
        <TextField
          sx={{
            m: "20px",
            width: "95%",
          }}
          autoComplete="new-password"
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
          type="text"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Password"
          size="small"
          variant="filled"
        />
        <Box
          textAlign={"right"}
          sx={{
            pt: 2,
            position: "sticky",
            bottom: "-16px",
            p: 1,
            zIndex: 1,
          }}
        >
          {isEdit ? (
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                ml: "10px",
                border: "Highlight",
                backgroundColor: "#ec7211",
                "&:hover": { backgroundColor: "#ec7211" },
              }}
              onClick={() => {
                handleOnDeleteGroup(formik.values.device_id);
                handleOnClose();
                refetch();
              }}
            >
              DELETE
            </Button>
          ) : (
            <></>
          )}
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{
              ml: "10px",
              border: "Highlight",
              backgroundColor: "#ec7211",
              "&:hover": { backgroundColor: "#ec7211" },
            }}
            onClick={() => {
              handleOnClose();
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            type="submit"
            sx={{
              ml: "10px",
              border: "Highlight",
              backgroundColor: "#ec7211",
              "&:hover": { backgroundColor: "#ec7211" },
            }}
          >
            SAVE
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default AddDeviceModal;
