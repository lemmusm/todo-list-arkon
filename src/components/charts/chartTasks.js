import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartTasks = ({ durations, names }) => {
  const data = {
    labels: names,
    datasets: [
      {
        label: 'Time',
        data: durations,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default ChartTasks;
