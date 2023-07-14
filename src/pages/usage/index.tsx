import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { PersistentDrawerLeftComponent } from "../../components/appBar/appBar";


const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() =>{
    router.push("/home")
  })
  return (
    <>
    </>
  );
};

Home.getLayout = (page: any) => (
  <PersistentDrawerLeftComponent>{page}</PersistentDrawerLeftComponent>
);

export default Home;
