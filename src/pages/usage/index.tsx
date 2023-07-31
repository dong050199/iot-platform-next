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
import { getUsage } from "../../services/apis/usage";

const Rules: NextPage = () => {
  const router = useRouter();

  const { data, isFetching, refetch } = useQuery(
    [`usage`],
    async () => getUsage(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

    console.log(data?.data)

  const ourSolutions = [
    {
      title: "Number Device Created",
      button: "Visit Device",
      path: "/devices",
      content: data?.data?.data?.device_created
    },
    {
      title: "Grafana Datasource",
      content: data?.data?.data?.datasource_created,
      button: "Visit Dashboard",
      path: "/dashboard",
    },
    {
      title: "Group Devices",
      content: data?.data?.data?.group_created,
      button: "Visit Group Devices",
      path: "/device-groups",
    },
    {
      title: "Rule Created",
      content: data?.data?.data?.device_created,
      button: "Visit Rule",
      path: "/rules",
    },
  ];
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={"20px"}
        justifyContent="center"
        mt={"10px"}
      >
        {ourSolutions.map((solution, index) => (
          <Grid key={solution.title} item>
            <Paper elevation={8} sx={{ height: 300, width: 300, p: 2 }}>
              <Grid
                container
                direction="column"
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Grid item>
                  <Typography
                    sx={{ fontWeight: "bold", mb: "10px" }}
                    variant="h6"
                  >
                    {solution.title}
                  </Typography>
                </Grid>
                <Grid item sx={{ p: 1 }}>
                  {" "}
                  <Typography
                    sx={{ fontWeight: "bold", mb: "10px" }}
                    variant="h2"
                  >
                    {solution.content}
                  </Typography>
                </Grid>
                <Grid item sx={{ bottom: 0, position: "relative" }}>
                  <Button
                    size="small"
                    sx={{
                      borderRadius: "30px",
                      color: "white",
                      border: "Highlight",
                      backgroundColor: "#ec7211",
                      mt: "5%",
                      "&:hover": { backgroundColor: "#ec7211" },
                    }}
                    style={{ textTransform: "none" }}
                    onClick={() => {
                      router.push(solution.path);
                    }}
                  >
                    <Typography component={"span"} sx={{ m: 1 }}>
                      {solution.button}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

Rules.getLayout = (page: any) => (
  <PersistentDrawerLeftComponent>{page}</PersistentDrawerLeftComponent>
);

export default Rules;
