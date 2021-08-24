import React from 'react';
import {
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles,
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import EditIcon from '@material-ui/icons/Edit';
import { useTaskList } from '../../hooks/useTaskList';

const CustomListItem = withStyles({
  root: {
    background: 'white',
    borderRadius: '10px',
    paddingTop: '1em',
    margin: '1em auto',
    '& .MuiListItemIcon-root': {
      marginRight: '1em',
    },
    '& .MuiIconButton-root': {
      color: deepPurple['A700'],
    },
    '& .MuiSvgIcon-fontSizeLarge': {
      cursor: 'pointer',
    },
  },
})(ListItem);

const CustomCheckbox = withStyles({
  root: {
    '&$checked': {
      color: deepPurple[700],
    },
  },
  checked: {},
})(Checkbox);

const CustomMessage = withStyles({
  root: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})(Typography);

const TaskList = () => {
  // access to custome hook properties
  const {
    handleDeleteTask,
    handleCompleteTask,
    handleEditTask,
    uncompleteTasks,
  } = useTaskList();

  return !uncompleteTasks.length ? (
    <CustomMessage variant="h5">There is no tasks to show</CustomMessage>
  ) : (
    <>
      <Typography variant="h5">All tasks</Typography>
      <List>
        {uncompleteTasks.map((task) => (
          <CustomListItem key={task.id}>
            <ListItemIcon>
              <IconButton>
                <PlayCircleFilledIcon fontSize="large" />
              </IconButton>
            </ListItemIcon>

            <Grid item sm={6}>
              <ListItemText
                primary={task.name}
                secondary={task.description}
              ></ListItemText>
            </Grid>
            <Grid item sm={6}></Grid>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  handleEditTask(task.id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleDeleteTask(task.id);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
              <CustomCheckbox
                edge="end"
                value={task.isComplete}
                onChange={() => {
                  handleCompleteTask(task.id);
                }}
              />
            </ListItemSecondaryAction>
          </CustomListItem>
        ))}
      </List>
    </>
  );
};

export default TaskList;
