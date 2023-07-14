import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { PersistentDrawerLeftComponent } from "../../components/appBar/appBar";
import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import styled from "styled-components";

import { Responsive, WidthProvider } from "react-grid-layout";
import { Box, Button, Container, Paper } from "@mui/material";
import { TotalChart } from "../../components/chartjs2/line/lineChart";
const data = JSON.parse(`{
  "status_code": 200,
  "code": 1,
  "data": {
    "labels": [
      "2023-07-01",
      "2023-07-02",
      "2023-07-03",
      "2023-07-04",
      "2023-07-05",
      "2023-07-06",
      "2023-07-07",
      "2023-07-08",
      "2023-07-09",
      "2023-07-10",
      "2023-07-11",
      "2023-07-12",
      "2023-07-13",
      "2023-07-14",
      "2023-07-15",
      "2023-07-16",
      "2023-07-17",
      "2023-07-18",
      "2023-07-19",
      "2023-07-20",
      "2023-07-21",
      "2023-07-22",
      "2023-07-23",
      "2023-07-24",
      "2023-07-25",
      "2023-07-26",
      "2023-07-27",
      "2023-07-28",
      "2023-07-29",
      "2023-07-30",
      "2023-07-31"
    ],
    "datasets": [
      {
        "label": "Sale",
        "data": [
          23767.70703125,
          21032.1171875,
          18803.080078125,
          15478.455078125,
          9478.54296875,
          2269.72705078125,
          1708.0491943359375,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "color": "#FF718B"
      },
      {
        "label": "Unit Sold",
        "data": [
          288,
          315,
          267,
          285,
          181,
          23,
          8,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "color": "#962DFF"
      },
      {
        "label": "ACOS",
        "data": [
          0.16666610855755076,
          0.19009926132317723,
          0.1939028050486659,
          0.22474704632914022,
          0.2967925447979338,
          0.5883128413404953,
          0.17813054700861664,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "color": "#93AAFD"
      },
      {
        "label": "ROAS",
        "data": [
          6.000020091995454,
          5.260409709325253,
          5.157222969255237,
          4.449446683875472,
          3.3693568707422656,
          1.6997759180667522,
          5.613860265929725,
          0,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        "color": "#9BFD93"
      }
    ]
  },
  "trace_id": "e8df5eb443472749cc9dc86132a41419"
}`)

const Dashboard: NextPage = () => {
  const [elements, setElement] = useState<JSX.Element[]>();

  const [arrItems, setArrItems] = useState({
    items: [].map(function (i: any, key, list: any[]) {
      return {
        i: i.toString(),
        x: 2,
        y: 0,
        w: 2,
        h: 2,
      };
    }),
    counter: 0,
  });

  const createElement = (el: any) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    } as React.CSSProperties;
    const i = el.i;
    return (
     <Paper key={i}>
     <TotalChart title="THIS IS THE CHART" data={data?.data} multiAxis={true} />
     </Paper>
    );
  };

  const handleRemoveItem = (i: any) => {
    const newArr = arrItems.items.filter((item) => {
      return item.i !== i;
    });
    setArrItems({
      items: newArr,
      counter: arrItems.counter,
    });
  };

  const handleAddItem = () => {
    const newArr = [...arrItems.items];
    newArr.push({
      i: "n" + arrItems.counter,
      x: 0,
      y: Infinity,
      w: 1,
      h: 1,
    });
    setArrItems({
      items: newArr,
      counter: (arrItems.counter += 1),
    });
  };

  return (
    <div>
      <Box>
        <Paper>
          <Button onClick={handleAddItem}>ADD ITEMS</Button>
        </Paper>
      </Box>

      <ResponsiveReactGridLayout
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={300}
        width={1000}
      >
        {_?.map(arrItems.items, (el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

Dashboard.getLayout = (page: any) => (
  <PersistentDrawerLeftComponent>{page}</PersistentDrawerLeftComponent>
);

export default Dashboard;
