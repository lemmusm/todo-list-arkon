import React from 'react';
import { List, Typography, withStyles } from '@material-ui/core';
import { useTaskList } from '../../hooks/useTaskList';
import Item from './item';

// style
const CustomMessage = withStyles({
  root: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})(Typography);

const TaskList = () => {
  // access to custom hook properties
  const { fTasks } = useTaskList();

  return (
    <>
      {!fTasks.length ? (
        <CustomMessage variant="h5">There is no tasks to show</CustomMessage>
      ) : (
        <List>
          {fTasks.map((task) => (
            <Item key={task.id} task={task} />
          ))}
        </List>
      )}
    </>
  );
};

export default TaskList;
