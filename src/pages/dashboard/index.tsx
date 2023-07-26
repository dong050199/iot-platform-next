import React, {
  MouseEvent,
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { PersistentDrawerLeftComponent } from "../../components/appBar/appBar";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../../components/severity-pill";
import Head from "next/head";
import { Skeleton } from "../../components/skeleton";
import { MuiTable } from "../../components/mui-table";
import AddDeviceGroupModal, { IAddDeviceModalProps } from "./container/modal";
import { useQuery } from "react-query";
import { getPagination } from "../../utils/pagination";
import { PAGINATION } from "../../constants/pagination";
import { capitalize, clone, mergeWith, pick } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getListDevices } from "../../services/apis/deviceGroup";
import { getUserInfoFromCookie } from "../../utils/cookies";
import Login from "../login";
import { FilterBase } from "../device-groups";
import { getListDevice } from "../../services/apis/device";
import {
  createUserOrgs,
  getListDeviceDataSource,
} from "../../services/apis/organization";
import LoginIcon from "@mui/icons-material/Login";
import UserModal from "./container/userInfoModal";
import { Password } from "@mui/icons-material";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { email, name } = getUserInfoFromCookie();
  useEffect(() => {
    if (!!!email) {
      router.push("/login?message=You must login to access this resource.");
    }
  });

  const [showLoginInfo, setShowLoginInfo] = useState(false);

  const [modalState, setModalState] = useState<IAddDeviceModalProps>({
    isOpen: false,
    isEdit: false,
    data: {},
  });

  const [filter, setFilter] = useState<FilterBase>({
    page_size: PAGINATION.PAGE_SIZE,
    page_index: PAGINATION.PAGE,
    name: "",
    id_includes: [],
    from_date: 0,
    to_date: 0,
    sort: PAGINATION.SORT_ASC,
  });

  const {
    data: dataOrs,
    isFetching: loadingOrgs,
    refetch: refetchOrgs,
  } = useQuery([`create-user-orgs`, filter], async () => createUserOrgs({}), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { data, isFetching, refetch } = useQuery(
    [`device-datasource-listing`, filter],
    async () => getListDeviceDataSource({ filter }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const handleCreate = () => {
    setModalState({
      isOpen: true,
      isEdit: false,
      data: {},
    });
  };
  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      isEdit: false,
      data: {},
    });
  };

  const mergeParams = mergeWith(
    {
      page_index: PAGINATION.PAGE_SIZE,
      page_size: PAGINATION.PAGE,
    },
    clone(filter)
  );

  const { page_index, page_size } = pick(mergeParams, [
    "page_index",
    "page_size",
  ]);

  const handleOnPageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setFilter({
      ...filter, // keep current filter when next page
      page_index: newPage,
      page_size: filter?.page_size || PAGINATION.PAGE_SIZE,
    });
  };

  const handleOnSearch = (values: any) => {
    // just search by name
    setFilter({
      page_index: PAGINATION.PAGE,
      page_size: filter?.page_size || PAGINATION.PAGE_SIZE,
      sort: PAGINATION.SORT_ASC,
      name: values.name,
    });
  };

  const handleOnRowsPerPageChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilter({
      page_size: PAGINATION.PAGE_SIZE,
      page_index: PAGINATION.PAGE,
      sort: PAGINATION.SORT_ASC,
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "Device ID",
        accessorKey: "device_id",
        size: 120,
        typeFilter: "includesMultipleFilter",
        Cell: ({ cell, row }: any) => (
          <>
            <Typography sx={{ fontSize: "15px" }}>{cell.getValue()}</Typography>
          </>
        ),
      },
      {
        header: "Device Name",
        accessorKey: "name",
        size: 180,
        typeFilter: "includesMultipleFilter",
        Cell: ({ cell, row }: any) => (
          <>
            <Button
              style={{ textTransform: "none" }}
              onClick={() => {
                setModalState({
                  isEdit: true,
                  isOpen: true,
                  data: row.original,
                });
              }}
            >
              <Typography
                fontWeight={"bold"}
                sx={{ fontSize: "15px", color: "#ec7211" }}
              >
                {cell.getValue()}
              </Typography>
            </Button>
          </>
        ),
      },
      {
        header: "Topic",
        accessorKey: "topic",
        size: 200,
        typeFilter: "includesMultipleFilter",
        Cell: ({ cell, row }: any) => {
          return (
            <SeverityPill
              color="primary"
              style={{
                minWidth: "100px",
                backgroundColor: "#ec7211",
              }}
            >
              <Typography sx={{ fontSize: "15px" }}>
                {cell.getValue()}
              </Typography>
            </SeverityPill>
          );
        },
      },
      {
        header: "State",
        accessorKey: "state",
        size: 200,
        typeFilter: "includesMultipleFilter",
        Cell: ({ cell, row }: any) => {
          return (
            <SeverityPill
              color="primary"
              style={{
                minWidth: "100px",
                backgroundColor: "#ec7211",
              }}
            >
              <Typography sx={{ fontSize: "15px" }}>
                {cell.getValue()}
              </Typography>
            </SeverityPill>
          );
        },
      },
      {
        header: "Created At",
        accessorKey: "created_at",
        size: 100,
        typeFilter: "includesMultipleFilter",
        Cell: ({ cell, row }: any) => {
          return (
            <>
              <Typography sx={{ fontSize: "15px" }}>
                {cell.getValue()}
              </Typography>
            </>
          );
        },
      },
    ],
    [data]
  );

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      handleOnSearch(values);
    },
  });

  const [openUserInfo, setOpenUserInfo] = useState(false);
  const handleCloseUserInfo = () => {
    setOpenUserInfo(false);
  };

  return (
    <>
      <Head>
        <title>Dashboard | Uraa</title>
      </Head>
      <Box
        sx={{
          height: "170px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#2e3b55",
          width: "100%",
        }}
      >
        <Grid>
          <Grid item>
            <Typography
              fontWeight={"bold"}
              sx={{
                color: "white",
                fontSize: "30px",
                m: 1,
              }}
            >
              Everything Is Already Configured For You
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              size="large"
              variant="contained"
              sx={{
                borderRadius: "30px",
                color: "white",
                border: "Highlight",
                backgroundColor: "#ec7211",
                "&:hover": { backgroundColor: "#ec7211" },
              }}
              href="http://localhost:3001"
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to Grafana
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth={false}>
        <Skeleton isLoading={false}>
          <Box sx={{ pt: "10px", ml: "0px", mb: 3 }}>
            <MuiTable
              columns={columns}
              data={data?.data?.data?.devices || []}
              loading={isFetching}
              getRowId={(row: any) => row.awsCampaignID}
              pagination={{
                ...getPagination({ rowsPerPage: page_size, page: page_index }),
                total: data?.data?.data?.total,
                onPageChange: (event: any, newPage: any) => {
                  handleOnPageChange(event, newPage);
                },
                onRowsPerPageChange: handleOnRowsPerPageChange,
              }}
              enableStickyFooter={true}
              enableExpandAll={false}
              enableSelectAll={false}
              enableRowVirtualization={false}
              positionExpandColumn="first"
              muiTableHeadCellProps={{
                sx: {
                  background: "#F3F4F6",
                  fontVariant: "h6",
                },
              }}
              displayColumnDefOptions={{
                "mrt-row-expand": {
                  size: 20,
                  Header: () => "",
                },
                "mrt-row-select": {
                  size: 20,
                  Header: () => "",
                },
              }}
              renderTopToolbarCustomActions={() => (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "inherit",
                    p: 1,
                    pl: 0,
                  }}
                >
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Button
                          size="medium"
                          variant="contained"
                          onClick={handleCreate}
                          sx={{
                            backgroundColor: "#ec7211",
                            "&:hover": { backgroundColor: "#ec7211" },
                          }}
                        >
                          Add Datasource
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          size="medium"
                          variant="contained"
                          onClick={() => {
                            setShowLoginInfo(true);
                            setOpenUserInfo(true);
                          }}
                          sx={{
                            backgroundColor: "#ec7211",
                            "&:hover": { backgroundColor: "#ec7211" },
                          }}
                        >
                          View Dashboard Login Info
                        </Button>
                      </Grid>
                      <Grid sx={{ ml: "65%", position: "absolute" }} item>
                        <form onSubmit={formik.handleSubmit}>
                          <TextField
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Search Group Device"
                            size="small"
                            variant="filled"
                            inputProps={{
                              style: {
                                height: "14px",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "right",
                              },
                            }}
                          />
                          <Button
                            type="submit"
                            size="medium"
                            variant="contained"
                            sx={{
                              ml: "10%",
                              position: "absolute",
                              backgroundColor: "#ec7211",
                              "&:hover": { backgroundColor: "#ec7211" },
                            }}
                          >
                            Search
                          </Button>
                        </form>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                    }}
                  ></Grid>
                </Grid>
              )}
            />
          </Box>
        </Skeleton>
        <AddDeviceGroupModal
          isEdit={modalState.isEdit}
          data={modalState.data}
          isOpen={modalState.isOpen}
          handleOnClose={handleCloseModal}
          refetch={refetch}
        />
        <UserModal
          isOpen={openUserInfo}
          handleOnClose={handleCloseUserInfo}
          userName={dataOrs?.data?.data?.user_name}
          password={dataOrs?.data?.data?.password}
        />
      </Container>
    </>
  );
};

Dashboard.getLayout = (page: any) => (
  <PersistentDrawerLeftComponent>{page}</PersistentDrawerLeftComponent>
);

export default Dashboard;
