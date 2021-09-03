import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import TaskList from '../../components/list/taskList';
import ToggleTasks from '../../components/list/toggleTasks';
import { useTaskList } from '../../hooks/useTaskList';
import { useSelector } from 'react-redux';
import { currentTask } from '../../redux/taskSlice';

const ListTasksPage = () => {
  // redux
  const task = useSelector(currentTask);
  const { id, isPaused } = task;

  // access to custom hook properties
  const { toggle, handleNewTask } = useTaskList();

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
          <Typography variant="h5">{!toggle ? 'Pending tasks' : 'Completed tasks'}</Typography>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          xs={12}
          md={8}
        >
          <ToggleTasks />
          <Button onClick={() => handleNewTask(id, isPaused)} variant="contained" color="primary">
            Create task
          </Button>
        </Grid>
      </Grid>
      <TaskList />
    </>
  );
};

export default ListTasksPage;
