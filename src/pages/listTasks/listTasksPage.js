import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TaskList from '../../components/list/taskList';
import ToggleTasks from '../../components/list/toggleTasks';
import { useTaskList } from '../../hooks/useTaskList';

const ListTasksPage = () => {
  // access to custom hook properties
  const { handleDeleteTask, handleCompleteTask, handleGetEditTask, fTasks, toggle } = useTaskList();

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
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/new-task">
            <Button variant="contained" color="primary">
              Create task
            </Button>
          </Link>
        </Grid>
      </Grid>
      <TaskList
        handleDeleteTask={handleDeleteTask}
        handleCompleteTask={handleCompleteTask}
        handleGetEditTask={handleGetEditTask}
        fTasks={fTasks}
        toggle={toggle}
      />
    </>
  );
};

export default ListTasksPage;
