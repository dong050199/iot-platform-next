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
import {
  createUserOrgs,
  getListDeviceDataSource,
} from "../../services/apis/organization";
import LoginIcon from "@mui/icons-material/Login";
import { getListRule } from "../../services/apis/rule";

const Rules: NextPage = () => {
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
              Working with Your Team - This Feature will Release Soon
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
              Turn Back Home
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth={false}>
        <Skeleton isLoading={false}>
          <Box sx={{ pt: "10px", ml: "0px", mb: 3 }}></Box>
        </Skeleton>
      </Container>
    </>
  );
};

Rules.getLayout = (page: any) => (
  <PersistentDrawerLeftComponent>{page}</PersistentDrawerLeftComponent>
);

export default Rules;
