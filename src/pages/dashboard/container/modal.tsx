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

  const handleAddDatasource = (id: number) => {
    const resp = addDeviceDatasource(id).then((result) => {
      if (result.status !== 200) {
      }
    });
  };

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

  const handleOnDeleteDeviceDatasource = (id: number) => {
    const resp = deleteDeviceDatasource(id).then((result) => {
      if (result.status !== 200) {
      }
    });
  };

  const {
    data: dataDevices,
    isFetching,
    refetch: refetchDevices,
  } = useQuery(
    [`list-device-devicess`],
    async () => {
      let response = await getListDeviceAddDatasource({ filter });
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
          Remove Datasource
        </Typography>
      ) : (
        <Typography variant="h5" sx={{ ml: "18px", fontWeight: "bold" }}>
          Add Device To Datasource
        </Typography>
      )}
      {isEdit ? (
        <></>
      ) : (
        <>
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
                label="Select Device To Add Datasource - Type and press Enter to Search..."
                variant="filled"
                {...params}
              />
            )}
          />
        </>
      )}

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
              handleOnDeleteDeviceDatasource(data?.device_id);
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
        {!!!isEdit ? (
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => {
              handleAddDatasource(deviceIDSelected);
              handleOnClose();
              refetch();
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
        ) : (
          <></>
        )}
      </Box>
    </Modal>
  );
};

export default AddDeviceGroupModal;
