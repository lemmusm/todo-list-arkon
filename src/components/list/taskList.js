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
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import { deepPurple, grey } from '@material-ui/core/colors';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CountdownTimer from '../countdown/countdownTimer';
import ControlsCountdown from '../countdown/controlsCountdown';

// style
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

const useStyles = makeStyles((theme) => ({
  durationTxt: {
    color: grey[500],
    fontSize: '.7em',
  },
  complete: {
    background: '#e0e0e0',
  },
}));

const TaskList = ({ handleDeleteTask, handleCompleteTask, handleGetEditTask, fTasks }) => {
  // get classes from style
  const classes = useStyles();

  return (
    <>
      {!fTasks.length ? (
        <CustomMessage variant="h5">There is no tasks to show</CustomMessage>
      ) : (
        <List>
          {fTasks.map((task) => (
            <CustomListItem
              disabled={task.isComplete ? true : false}
              key={task.id}
              className={task.isComplete ? classes.complete : null}
            >
              <ListItemIcon>
                <ControlsCountdown
                  id={task.id}
                  isReset={task.isReset}
                  isComplete={task.isComplete}
                  isPaused={task.isPaused}
                />
              </ListItemIcon>
              <Grid item sm={6}>
                <Grid item sm={12}>
                  <ListItemText primary={task.name} secondary={task.description}></ListItemText>
                </Grid>
                <Grid className={classes.durationTxt} item sm={12}>
                  {task.duration} min
                </Grid>
              </Grid>
              <Grid item sm={6}>
                {task.remainingTime.hours === 0 &&
                task.remainingTime.minutes === 0 &&
                task.remainingTime.seconds === 0 ? null : (
                  <CountdownTimer
                    hours={task.remainingTime.hours}
                    minutes={task.remainingTime.minutes}
                    seconds={task.remainingTime.seconds}
                  />
                )}
              </Grid>
              <ListItemSecondaryAction>
                <IconButton
                  disabled={task.isComplete ? true : false}
                  onClick={() => handleGetEditTask(task.id, task.isPaused)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  disabled={task.isComplete ? true : false}
                  onClick={() => {
                    handleDeleteTask(task.id);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
                <CustomCheckbox
                  disabled={task.isComplete ? true : false}
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
      )}
    </>
  );
};

export default TaskList;
