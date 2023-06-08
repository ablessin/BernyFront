import Box from "@mui/material/Box";
import * as React from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function mergeAndSortDates(arr1, arr2, arr3) {
  // Fusion des tableaux en utilisant l'opérateur de spread
  const mergedArray = [...arr1, ...arr2, ...arr3];

  // Tri des dates par ordre croissant
  mergedArray.sort((a, b) => new Date(a) - new Date(b));

  return mergedArray;
}

export default function ActivityChart({
  chartDataDeliveries,
  chartDataCleanings,
  chartDataDeliveriesBack,
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const cleaningsLabels = chartDataCleanings.map((data) => data.date);

  const deliveriesLabels = chartDataDeliveries.map((data) => data.date);

  const deliveriesBackLabels = chartDataDeliveriesBack.map((data) => data.date);

  const labels = mergeAndSortDates(
    deliveriesLabels,
    cleaningsLabels,
    deliveriesBackLabels
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Livraison",
        data: chartDataDeliveries.map((data) => data.count),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Nettoyage",
        data: chartDataCleanings.map((data) => data.count),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Livraison retour",
        data: chartDataDeliveriesBack.map((data) => data.count),
        borderColor: "rgb(255, 127, 0)",
        backgroundColor: "rgba(255, 127, 0, 0.5)",
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Line options={options} data={data} />;
    </Box>
  );
}
