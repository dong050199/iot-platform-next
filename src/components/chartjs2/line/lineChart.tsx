import { Grid, Paper } from "@mui/material";
import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import { Box } from "@mui/system";
import { max, min } from "lodash";
import Decimal from "decimal.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TotalChartProps {
  title: string;
  data: any;
  multiAxis?: boolean;
}

function tickNumberFormat(num: any) {
  var numMultiplication = 1;
  if (num === 0) return num;
  if (num > 10) {
    while (num > 10) {
      num = num / 10;
      numMultiplication *= 10;
    }
  }
  if (num < 1) {
    while (num < 1) {
      num = num * 10;
      numMultiplication /= 10;
    }
  }

  num = Math.ceil(num);
  num = new Decimal(num).mul(new Decimal(numMultiplication)).toNumber();

  return num;
}
export const TotalChart: FC<TotalChartProps> = ({
  title,
  data,
  multiAxis = false,
}) => {
  var multiAxisY = {};
  if (multiAxis) {
    data?.datasets.map((item: any, index: any) => {
      let stepSize = {};
      var maxValue: any = max(item?.data || []);
      if (maxValue) {
        const stepValue = tickNumberFormat(maxValue / 5);
        maxValue = stepValue * 5;
        if (stepValue) {
          stepSize = { stepSize: stepValue };
        }
      }
      multiAxisY = {
        ...multiAxisY,
        ["y" + index]: {
          type: "linear",
          display: "auto",
          position: index % 2 === 0 ? "left" : "right",
          ticks: {
            color: "#1E1B39",
            ...stepSize,
          },

          min: 0,
          max: maxValue,
        },
      };
    });
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 5,
          boxHeight: 5,
        },
      },
      title: {
        display: true,
        text: title ?? "",
        color: "#1E1B39",
        align: "start",
        font: {
          size: 22,
          weight: 700,
        },
      },
    // },
    // scales: {
    //   x: {
    //     ticks: {
    //       autoSkipPadding: 10,
    //     },
    //   },
    //   ...multiAxisY,
    },
  };

  return (
    <>
      <LineChart options={options} data={dataEx} />
    </>
  );
};

const dataEx = {
    labels: ["ngay ni qua ngay te", "ngay te qua ngay ni", 3, 4, 5, 6, 7, 8, 9],
    datasets: [
      {
        label: 'First one',
        fill: true,
        backgroundColor: '#9e0d1e',
        borderColor: '#9e0d1e',

        data: [2, 1, 2, 0, 3],
      },
      {
        label: 'Second one',
        fill: true,
        color:"#1E1B39",
        data: [2, 4, 2, 3,5 ],
      },
      {
        label: 'Third one',
        fill: true,
        borderColor: 'cyan',
        data: [1,2,1,2,1],
      },
    ],
  }

const LineChart = ({ options, data }: { options: any; data: any }) => {
  return <Line className="canvas-item" options={options} data={data} />;
};
