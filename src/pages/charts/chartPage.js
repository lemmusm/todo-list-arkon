import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useCharts } from '../../hooks/useCharts';
import ChartTasks from '../../components/charts/chartTasks';

const ChartPage = () => {
  const { durations, names } = useCharts();

  return (
    <>
      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
        <Grid
          container
          item
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          md={4}
        >
          <Typography variant="h5">Charts</Typography>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          xs={12}
          md={8}
        ></Grid>
      </Grid>
      <ChartTasks durations={durations} names={names} />
    </>
  );
};

export default ChartPage;
