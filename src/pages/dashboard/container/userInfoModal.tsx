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

export interface IuserModalProps {
  isOpen: boolean;
  handleOnClose?: any;
  userName: string;
  password: string;
}

export const UserModal: FC<IuserModalProps> = ({
  isOpen,
  handleOnClose,
  userName,
  password,
}) => {
  const [typeView, setTypeView] = useState("password");

  const handleViewUserPass = () => {
    setTypeView("text");
  };

  const handleHideUserPass = () => {
    setTypeView("password");
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
      <Typography variant="h5" sx={{ ml: "18px", fontWeight: "bold" }}>
        Grafana - Change your default password
      </Typography>
      <TextField
        sx={{
          m: "20px",
          width: "95%",
        }}
        value={userName}
        type={typeView}
        label="User Name"
        size="small"
        variant="filled"
      />
      <TextField
        sx={{
          m: "20px",
          width: "95%",
        }}
        value={password}
        type={typeView}
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
        {typeView!! !== "password" ? (
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
              setTypeView("password");
            }}
          >
            HIDE
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
              setTypeView("text");
            }}
          >
            SHOW
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
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default UserModal;
