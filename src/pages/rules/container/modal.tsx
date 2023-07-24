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
import {
  addDeviceDatasource,
  deleteDeviceDatasource,
  getListDeviceAddDatasource,
} from "../../../services/apis/organization";
import {
  createRule,
  getListDevicesRule,
  updateRule,
} from "../../../services/apis/rule";

export interface IAddDeviceModalProps {
  isOpen: boolean;
  handleOnClose?: any;
  isEdit: boolean;
  data: any;
  refetch?: any;
}

export const AddDeviceGroupModal: FC<IAddDeviceModalProps> = ({
  isOpen,
  handleOnClose,
  isEdit,
  data,
  refetch,
}) => {
  const router = useRouter();
  const [deviceIDSelected, setDeviceIDSelected] = useState(0);
  const options = ["EQUAL", "NOT EQUAL", "GREATER THAN", "LESS THAN"];

  const [value1, setValue1] = useState<string | null>(options[0]);
  const [inputValue1, setInputValue1] = useState("");
  const [value2, setValue2] = useState<string | null>(options[0]);
  const [inputValue2, setInputValue2] = useState("");
  const [value3, setValue3] = useState<string | null>(options[0]);
  const [inputValue3, setInputValue3] = useState("");

  const formik = useFormik({
    initialValues: {
      device_id: 0,
      name: "",
      attribute: "",
      comparison: "",
      value: 0,
    },
    onSubmit: (values) => {
      console.log("THIS IS THE RULES");
      console.log(values);
      // if (deviceIDSelected === 0) {
      //   handleOnClose();
      //   return;
      // }
      // handleAddDatasource(deviceIDSelected);
      handleOnClose();
      refetch();
      // isEdit
      //   ? onUpdate({
      //       device_id: data.device_id,
      //       profile_id: data.profile_id,
      //       group_id: formik.values.group_id,
      //       name: values.name,
      //       description: values.description,
      //       topic: values.topic,
      //       state: values.state,
      //       user_name: values.user_name,
      //       password: values.password,
      //     })
      //   : onCreate({
      //       device_id: 0,
      //       profile_id: 0,
      //       group_id: formik.values.group_id,
      //       name: values.name,
      //       description: values.description,
      //       topic: values.topic,
      //       state: values.state,
      //       user_name: values.user_name,
      //       password: values.password,
      //     });
      // refetch();
    },
    validationSchema: Yup.object().shape({
      group_id: Yup.number()
        .min(1, "Please select valid group")
        .required("Please select group of devices"),
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      topic: Yup.string().required("Please create topic for this device"),
      user_name: Yup.string()
        .required("User name is require for device")
        .min(8, "User name must be at least 8 characters"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Please enter the password for this device"),
    }),
  });

  // useEffect(() => {
  //   if (isEdit) {
  //     formik.setValues({
  //       device_id: data.device_id,
  //       profile_id: data.profile_id,
  //       group_id: data.group_id,
  //       name: data.name,
  //       description: data.description,
  //       topic: data.topic,
  //       state: data.state,
  //       user_name: data.user_name,
  //       password: data.password,
  //     });
  //   } else {
  //   }
  // }, []);

  const { mutate: onCreate, isLoading: loadingCreate } = useMutation(
    async (values: any) => {
      try {
        const response: any = await createRule(values);
        if (response?.status !== 200) {
          toastOptions(
            "error",
            response?.message ?? "Create device failed",
            <PriorityHighIcon />
          );
          return false;
        } else {
          toastOptions("success", "Create device success!", <DoneAllIcon />);
          refetch && refetch();
          handleOnClose();
          return true;
        }
      } catch (error: any) {
        toastOptions(
          "error",
          error?.message ?? "Create device failed",
          <PriorityHighIcon />
        );
        return false;
      }
    }
  );

  const { mutate: onUpdate, isLoading: loadingUpdate } = useMutation(
    async (values: any) => {
      try {
        const response: any = await updateRule(values);
        if (response?.status !== 200) {
          toastOptions(
            "error",
            response?.message ?? "Update device group failed",
            <PriorityHighIcon />
          );
          return false;
        } else {
          toastOptions(
            "success",
            "Update device group success!",
            <DoneAllIcon />
          );
          refetch && refetch();
          handleOnClose();
          return true;
        }
      } catch (error: any) {
        toastOptions(
          "error",
          error?.message ?? "Update device group failed",
          <PriorityHighIcon />
        );
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

  const handleSetFilter = (name: string) => {
    setFilter({
      page_size: PAGINATION.PAGE_SIZE,
      page_index: PAGINATION.PAGE,
      name: name,
      sort: PAGINATION.SORT_ASC,
    });
  };

  const {
    data: dataDevices,
    isFetching,
    refetch: refetchDevices,
  } = useQuery(
    [`list-device-devicess`],
    async () => {
      let response = await getListDevicesRule({ filter });
      // if result not null set to map
      if (response.status == 200 && response.data.data.devices != null) {
        return response;
      }
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const handleChangeInput = () => {
    refetchDevices();
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
          Update Rule
        </Typography>
      ) : (
        <Typography variant="h5" sx={{ ml: "18px", fontWeight: "bold" }}>
          Add Rule to Device
        </Typography>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Autocomplete
          disablePortal
          fullWidth
          id="combo-box-demo"
          options={dataDevices?.data?.data?.devices || []}
          getOptionLabel={(option: any) => {
            return option.name;
          }}
          onInputChange={(event, data) => {
            handleSetFilter(data || "");
          }}
          onChange={(event, data) => {
            setDeviceIDSelected(data?.device_id || 0);
          }}
          onKeyDown={(event) => {
            // search when enter key is pressed
            if (event.key === "Enter") {
              handleChangeInput();
            }
          }}
          renderInput={(params) => (
            <TextField
              sx={{
                m: "20px",
                width: "95%",
              }}
              type="text"
              label="Select Device To Add Rule - Type and press Enter to Search..."
              variant="filled"
              {...params}
            />
          )}
        />
        <TextField
          sx={{
            m: "20px",
            width: "95%",
          }}
          type="text"
          fullWidth
          name="name"
          size="small"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="filled"
          label="Rule Name"
        />
        <Grid container spacing={"10px"} sx={{ mt: "10px" }}>
          <Grid item>
            <TextField
              sx={{
                m: "20px",
              }}
              type="number"
              value={formik.values.attribute}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="attribute"
              label="Attribute"
              size="small"
              variant="filled"
            />
          </Grid>
          <Grid item>
            <Autocomplete
              sx={{
                m: "20px",
              }}
              value={value1}
              onChange={(event: any, newValue: string | null) => {
                setValue1(newValue);
              }}
              inputValue={inputValue1}
              onInputChange={(event, newInputValue) => {
                setInputValue1(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "187px" }}
                  type="text"
                  name="rule1_comp"
                  size="small"
                  variant="filled"
                  label="Select Coparision"
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              sx={{
                m: "20px",
              }}
              type="number"
              name="value"
              value={formik.values.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Rule Value"
              size="small"
              variant="filled"
            />
          </Grid>
        </Grid>
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
                // handleOnDeleteDeviceDatasource(data?.device_id);
                handleOnClose();
                refetch();
              }}
            >
              Confirm
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
              refetch();
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

export default AddDeviceGroupModal;
