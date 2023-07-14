import {
  Box,
  Button,
  Grid,
  Paper,
  Divider,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import * as Yup from "yup";
import React, { FC, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { assign, capitalize, flowRight, get, keyBy, map } from "lodash";
import { Form } from "react-hook-form";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import {
  createDeviceGroup,
  updateDeviceGroup,
} from "../../../services/apis/iot-api";
import { toastOptions } from "../../../utils/toast.options";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Skeleton } from "../../../components/skeleton";
import AddDeviceGroupModal from "../../device-groups/container/modal";
import {Modal} from "../../../components/modal"

export interface IAddDeviceModalProps {
  isOpen: boolean;
  handleOnClose?: any;
  isEdit?: boolean;
  data: any;
  refetch?: any;
}

export const AddDeviceModal: FC<IAddDeviceModalProps> = ({
  isOpen,
  handleOnClose,
  isEdit,
  data,
  refetch,
}) => {

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      // handleOnSearch(values);
    },

  });



  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Paper
        sx={{
          overflow: "auto",
          display: "inline-block",
          position: "absolute",
          top: "10%",
          left: "10%",
          right: "10%",
          bottom: "10%",
        }}
      >
        <Paper
          sx={{
            height: "10%",
            borderRadius: "0",
            justifyContent: "center",
            pt: "20px",
            pl: "12px",
            background: "#2e3b55",
          }}
        >
          <Typography color={"white"} variant="h5" sx={{ fontWeight: "bold" }}>
            Create Group Device
          </Typography>
        </Paper>
        <form>
          <TextField
            sx={{
              pt: "10px",
              m: "20px",
              width: "95%",
            }}
            id="filled-error-helper-text"
            label="Group Name"
            defaultValue="Group Name"
            variant="filled"
          />
          <TextField
            sx={{
              m: "20px",
              width: "95%",
            }}
            id="filled-error-helper-text"
            label="Group Name"
            defaultValue="Group Name"
            variant="filled"
          />
          <Grid sx={{ width: "100%" }} container spacing={5}>
            <Grid item>
              <TextField
                sx={{
                  m: "20px",
                  width: "250px"

                }}
                id="filled-error-helper-text"
                label="Group Name"
                defaultValue="Group Name"
                variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                sx={{
                  m: "20px",
                  width: "250px"
                }}
                fullWidth
                id="filled-error-helper-text"
                label="Group Name"
                defaultValue="Group Name"
                variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                sx={{
                  m: "20px",
                  width: "250px"
                }}
                fullWidth
                id="filled-error-helper-text"
                label="Group Name"
                defaultValue="Group Name"
                variant="filled"
              />
            </Grid>
          </Grid>
          <Grid sx={{ width: "100%" }} container spacing={5}>
            <Grid item>
              <TextField
                sx={{
                  m: "20px",
                  width: "250px"
                }}
                id="filled-error-helper-text"
                label="Group Name"
                defaultValue="Group Name"
                variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                sx={{
                  m: "20px",
                  width: "250px"
                }}
                fullWidth
                id="filled-error-helper-text"
                label="Group Name"
                defaultValue="Group Name"
                variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                sx={{
                  m: "20px",
                  width: "250px"

                }}
                fullWidth
                id="filled-error-helper-text"
                label="Group Name"
                defaultValue="Group Name"
                variant="filled"
              />
            </Grid>
          </Grid>
          <TextField
            multiline
            maxRows={4}
            sx={{
              m: "20px",
              width: "95%",
            }}
            fullWidth
            id="filled-error-helper-text"
            label="Group Name"
            defaultValue="Group Name"
            variant="filled"
          />
          <Box ml={"80%"}>
            <Button
              variant="outlined"
              color="inherit"
              size="medium"
              sx={{
                m: 1,
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
              size="medium"
              type="submit"
              sx={{
                left: "10px",
                m: 1,
                height: "10%",
                border: "Highlight",
                backgroundColor: "#ec7211",
                "&:hover": { backgroundColor: "#ec7211" },
              }}
            >
              SAVE
            </Button>
          </Box>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddDeviceModal;
