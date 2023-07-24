import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { PersistentDrawerLeftComponent } from "../../components/appBar/appBar";
import Footer from "../../components/landingPage/footer";
import { getUserInfoFromCookie } from "../../utils/cookies";
import { useDispatch } from "react-redux";

const Home: NextPage = () => {
  const ourSolutions = [
    {
      title: "Resfull For All Data",
      content:
        "this is the content of the homepage,this is the content of the homepage,this is the content of the homepage",
      button: "Visit here",
    },
    {
      title: "Devices Management",
      content:
        "this is the content of the homepage,this is the content of the homepage,this is the content of the homepage",
      button: "Visit here",
    },
    {
      title: "Group Management",
      content:
        "this is the content of the homepage,this is the content of the homepage,this is the content of the homepage",
      button: "Visit here",
    },
    {
      title: "MQTT Plugin",
      content:
        "this is the content of the homepage,this is the content of the homepage,this is the content of the homepage",
      button: "Visit here",
    },
  ];

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Box
        display={"flex"}
        sx={{ background: "#2e3b55", height: "35%", mb: "15px" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Grid>
            <Grid item>
              <Typography
                component={"span"}
                sx={{ wordWrap: "break-word" }}
                variant="h3"
                color={"white"}
              >
                The Powerfull IoT Platform for Software Developers
              </Typography>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                sx={{
                  borderRadius: "30px",
                  color: "white",
                  border: "Highlight",
                  backgroundColor: "#ec7211",
                  mt: "5%",
                  "&:hover": { backgroundColor: "#ec7211" },
                }}
                style={{ textTransform: "none" }}
              >
                <Typography component={"span"} sx={{ m: 1 }} variant="h6">
                  Start Making Your Applications
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        style={{
          height: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography component={"span"} variant="h4">
          Explore Our Solutions
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            ml: "20px",
            width: "100%",
            height: "35%",
          },
        }}
      >
        <Grid
          container
          direction="row"
          spacing={"20px"}
          justifyContent="center"
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
                    {solution.content}
                  </Grid>
                  <Grid item sx={{ bottom: 0, position: "relative" }}>
                    <Button
                      sx={{
                        borderRadius: "30px",
                        color: "white",
                        border: "Highlight",
                        backgroundColor: "#ec7211",
                        mt: "5%",
                        "&:hover": { backgroundColor: "#ec7211" },
                      }}
                      style={{ textTransform: "none" }}
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
      </Box>

      <Box
        height={200}
        sx={{
          display: "flex",

          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 300,
            height: 300,
          },
        }}
      ></Box>

      <Footer />
    </>
  );
};

Home.getLayout = (page: any) => (
  <PersistentDrawerLeftComponent >
    {page}
  </PersistentDrawerLeftComponent>
);

export default Home;
