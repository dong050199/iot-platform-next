import {
  Box,
  Button,
  Grid,
  Paper,
  Divider,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import * as Yup from "yup";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import {
  createDeviceGroup,
  deleteDeviceGroup,
  updateDeviceGroup,
} from "../../../services/apis/deviceGroup";
import { toastOptions } from "../../../utils/toast.options";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useRouter } from "next/router";
import { Modal } from "../../../components/modal";
import { result } from "lodash";
import { SnackBarProps } from "../../../components/toast/snack-bar";

export interface IAddDeviceGroupModalProps {
  isOpen: boolean;
  handleOnClose?: any;
  isEdit: boolean;
  data: any;
  refetch?: any;
  setSnackBar?: any;
}

export const AddDeviceGroupModal: FC<IAddDeviceGroupModalProps> = ({
  isOpen,
  handleOnClose,
  isEdit,
  data,
  refetch,
  setSnackBar,
}) => {

  useEffect(() => {
    if (isOpen) {
      setSnackBar({})
    }
  },[isOpen])

  const initialValues = {
    group_id: 0,
    location_id: 0,
    name: "",
    description: "",
    location_name: "",
    latitude: 0,
    longtitude: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      isEdit
        ? onUpdate({
            group_id: data.group_id,
            name: values.name,
            description: values.description,
            location_id: data.location_id,
            location_name: values.location_name,
            latitude: values.latitude,
            longtitude: values.longtitude,
          })
        : onCreate({
            name: values.name,
            description: values.description,
            location_name: values.location_name,
            latitude: values.latitude,
            longtitude: values.longtitude,
          });
      refetch();
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      location_name: Yup.string().required("Location name is required"),
    }),
  });

  const handleOnDeleteGroup = (id: number) => {
    const resp = deleteDeviceGroup(id).then((result) => {
      if (result.status !== 200) {
        setSnackBar({
          content: "Delete group failed",
          messageType: "error",
          timeToast: Date.now(),
        });
      } else {
        setSnackBar({
          content: "Delete group succeeded",
          messageType: "success",
          timeToast: Date.now(),
        });
      }
    });
  };

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        ...formik.values,
        ...data,
      });
    } else {
      formik.setValues(initialValues);
    }
  }, [data, isEdit]);

  const { mutate: onCreate, isLoading: loadingCreate } = useMutation(
    async (values: any) => {
      try {
        const response: any = await createDeviceGroup(values);
        if (response?.status !== 200) {
          setSnackBar({
            content: response?.errorContent || "Create device group failed",
            messageType: "error",
            timeToast: Date.now(),
          });
          return false;
        } else {
          setSnackBar({
            content: "Create device group succeeded",
            messageType: "success",
            timeToast: Date.now(),
          });
          refetch && refetch();
          handleOnClose();
          return true;
        }
      } catch (error: any) {
        setSnackBar({
          content: "Create device group failed",
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
        const response: any = await updateDeviceGroup(values);
        if (response?.status !== 200) {
          setSnackBar({
            content: response?.errorContent || "Update device group failed",
            messageType: "error",
            timeToast: Date.now(),
          });
          return false;
        } else {
          setSnackBar({
            content: "Update device group succeeded",
            messageType: "success",
            timeToast: Date.now(),
          });
          refetch && refetch();
          handleOnClose();
          return true;
        }
      } catch (error: any) {
        setSnackBar({
          content: "Update device group failed",
          messageType: "error",
          timeToast: Date.now(),
        });
        return false;
      }
    }
  );

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
          Update Group Device
        </Typography>
      ) : (
        <Typography variant="h5" sx={{ ml: "18px", fontWeight: "bold" }}>
          Create Group Device
        </Typography>
      )}
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          sx={{
            m: "20px",
            width: "95%",
          }}
          autoComplete="new-password"
          error={Boolean(formik.errors.name)}
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Device Group Name"
          size="small"
          variant="filled"
        />
        <TextField
          sx={{
            m: "20px",
            width: "95%",
          }}
          autoComplete="off"
          error={Boolean(formik.errors.description)}
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Description"
          size="small"
          variant="filled"
        />
        <TextField
          sx={{
            m: "20px",
            width: "95%",
          }}
          autoComplete="off"
          error={Boolean(formik.errors.location_name)}
          type="text"
          name="location_name"
          value={formik.values.location_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Location Name"
          size="small"
          variant="filled"
        />
        <Grid sx={{ width: "100%" }} container spacing={1}>
          <Grid item>
            <TextField
              autoComplete="off"
              sx={{
                m: "20px",
                width: "200px",
              }}
              type="number"
              name="latitude"
              value={formik.values.latitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Latitude"
              size="small"
              variant="filled"
            />
          </Grid>
          <Grid item>
            <TextField
              autoComplete="off"
              sx={{
                m: "20px",
                width: "200px",
              }}
              type="number"
              name="longtitude"
              value={formik.values.longtitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Longtitude"
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
                handleOnDeleteGroup(formik.values.group_id);
                handleOnClose();
                refetch();
              }}
            >
              DELETE
            </Button>
          ) : (
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
              DRAFT
            </Button>
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

export default AddDeviceGroupModal;
