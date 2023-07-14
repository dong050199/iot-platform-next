import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Router, useRouter } from "next/router";
import { AppBar, Button, Typography } from "@mui/material";
import { PersistentDrawerLeftComponent } from "../components/appBar/appBar";

const Home: NextPage = () => {
  const router = useRouter();
useEffect(() => {
  router.push("/home");
})
  return <></>;
};

Home.getLayout = (page: any) => (
  <PersistentDrawerLeftComponent>{page}</PersistentDrawerLeftComponent>
);

export default Home;
