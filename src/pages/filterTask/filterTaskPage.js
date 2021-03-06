import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import TaskList from '../../components/list/taskList';
import SelectFilter from '../../components/list/selectFilter';

const FilterTaskPage = () => {
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
          md={3}
        >
          <Typography variant="h5">Filtering tasks</Typography>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          xs={12}
          md={9}
        >
          <SelectFilter />
        </Grid>
      </Grid>
      <TaskList />
    </>
  );
};

export default FilterTaskPage;
