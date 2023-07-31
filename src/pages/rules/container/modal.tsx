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
  getListDevice,
  updateDevice,
} from "../../../services/apis/device";
import {
  addDeviceDatasource,
  deleteDeviceDatasource,
  getListDeviceAddDatasource,
} from "../../../services/apis/organization";
import {
  createRule,
  deleteRule,
  getListDevicesRule,
  updateRule,
} from "../../../services/apis/rule";

export interface IAddRuleModalProps {
  isOpen: boolean;
  handleOnClose?: any;
  isEdit: boolean;
  data: any;
  refetch?: any;
  setSnackBar?: any;
}

export const AddRuleModal: FC<IAddRuleModalProps> = ({
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
      setSnackBar({});
    }
  }, []);

  const router = useRouter();
  const options = ["EQUAL", "NOT EQUAL", "GREATER THAN", "LESS THAN"];

  const [value1, setValue1] = useState<string | null>(options[0]);
  const [inputValue1, setInputValue1] = useState("");
  const initialValues = {
    device_id: 0,
    rule_id: 0,
    name: "",
    attribute: "",
    comparison: "",
    rule_value: 0,
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      isEdit
        ? onUpdate({
            rule_id: data.rule_id,
            device_id: formik.values.device_id,
            name: values.name,
            attribute: values.attribute,
            comparison: values.comparison,
            rule_value: values.rule_value,
          })
        : onCreate({
            rule_id: 0,
            device_id: formik.values.device_id,
            name: values.name,
            attribute: values.attribute,
            comparison: values.comparison,
            rule_value: values.rule_value,
          });
      handleOnClose();
      refetch();
    },
    validationSchema: Yup.object().shape({
      device_id: Yup.number()
        .min(1, "Please select valid device")
        .required("Please select device to add rule"),
      name: Yup.string().required("Name is required"),
      attribute: Yup.string().required("Atribute is required"),
      comparison: Yup.string().required("Please slect valid comparision"),
      rule_value: Yup.number()
        .required("Rule value is require")
        .min(0, "Value must be negative"),
    }),
  });

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        rule_id: data.rule_id,
        device_id: data.device_id,
        name: data.name,
        attribute: data.attribute,
        comparison: data.comparison,
        rule_value: data.rule_value,
      });
    } else {
      formik.setValues(initialValues);
    }
  }, [data, isEdit]);

  const { mutate: onCreate, isLoading: loadingCreate } = useMutation(
    async (values: any) => {
      try {
        const response: any = await createRule(values);
        if (response?.status !== 200) {
          setSnackBar({
            content: response?.errorContent || "Create rule failed",
            messageType: "error",
            timeToast: Date.now(),
          });
          return false;
        } else {
          setSnackBar({
            content: "Create rule succeeded",
            messageType: "success",
            timeToast: Date.now(),
          });
          refetch && refetch();
          handleOnClose();
          return true;
        }
      } catch (error: any) {
        setSnackBar({
          content: "Create rule failed",
          messageType: "error",
          timeToast: Date.now(),
        });
        return false;
      }
    }
  );

  const { mutate: onUpdate, isLoading: loadingUpdate } = useMutation(
    async (values: any) => {
      try {
        const response: any = await updateRule(values);
        if (response?.status !== 200) {
          setSnackBar({
            content: response?.errorContent || "Update rule failed",
            messageType: "error",
            timeToast: Date.now(),
          });
          return false;
        } else {
          setSnackBar({
            content: "Uddate rule succeeded",
            messageType: "success",
            timeToast: Date.now(),
          });
          refetch && refetch();
          handleOnClose();
          return true;
        }
      } catch (error: any) {
        setSnackBar({
          content: "Update rule failed",
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
    [`list-device-rules`],
    async () => {
      let response = await getListDevice({ filter });
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

  const handleDeleteRule = (id: number) => {
    const resp = deleteRule(id).then((result) => {
      if (result.status !== 200) {
        setSnackBar({
          content: "Delete rule failed",
          messageType: "error",
          timeToast: Date.now(),
        });
      } else {
        setSnackBar({
          content: "Delete rule succeeded",
          messageType: "success",
          timeToast: Date.now(),
        });
      }
    });
  };

  const handleChangeInput = () => {
    refetchDevices();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
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
        {isEdit ? (
          <></>
        ) : (
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
              formik.setFieldValue("device_id", data?.device_id || 0);
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
                error={Boolean(formik.errors.device_id)}
                helperText={formik.errors.device_id}
                type="text"
                label="Select Device To Add Rule - Type and press Enter to Search..."
                variant="filled"
                {...params}
              />
            )}
          />
        )}

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
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}
          variant="filled"
          label="Rule Name"
        />
        <Grid container spacing={"10px"} sx={{ mt: "10px" }}>
          <Grid item>
            <TextField
              sx={{
                m: "20px",
              }}
              type="text"
              value={formik.values.attribute}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.attribute)}
              helperText={formik.errors.attribute}
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
                // formik.setFieldValue("comparision", newValue || "");
              }}
              inputValue={inputValue1}
              onInputChange={(event, newInputValue) => {
                if (event) {
                  formik.setFieldValue("comparison", newInputValue || "");
                  setInputValue1(newInputValue);
                }
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(formik.errors.comparison)}
                  helperText={formik.errors.comparison}
                  sx={{ width: "187px" }}
                  type="text"
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
              name="rule_value"
              error={Boolean(formik.errors.rule_value)}
              helperText={formik.errors.rule_value}
              value={formik.values.rule_value}
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
                handleDeleteRule(data?.rule_id);
                handleOnClose();
                refetch();
              }}
            >
              Delete
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
            onClick={() => {
              formik.submitForm();
            }}
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
      </Modal>
    </form>
  );
};

export default AddRuleModal;
