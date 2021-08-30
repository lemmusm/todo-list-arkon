import React from 'react';
import {
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { deepPurple, teal } from '@material-ui/core/colors';
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
      opacity: 0.8,
      '&:hover': { opacity: 1 },
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
  remainingTime: {
    color: deepPurple[900],
    fontWeight: 'bold',
    fontSize: '.8em',
  },
  complete: {
    background: '#e0e0e0',
  },
  totalTime: {
    color: teal[500],
    fontSize: '.7em',
  },
  '& .MuiInput-underline .Mui-disabled': {
    '&:before': {
      borderBottom: 'none',
    },
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
              <Grid container item direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={3} style={{ textAlign: 'center' }}>
                  <ListItemIcon>
                    <ControlsCountdown
                      id={task.id}
                      isReset={task.isReset}
                      isComplete={task.isComplete}
                      isPaused={task.isPaused}
                    />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid item sm={12}>
                    <ListItemText primary={task.name}></ListItemText>
                    <TextField
                      style={{
                        marginBottom: '1em',
                        border: 'none',
                        '&:before': {
                          content: '',
                        },
                      }}
                      multiline
                      maxRows={4}
                      fullWidth
                      disabled={true}
                      defaultValue={task.description}
                    />
                  </Grid>
                  <Grid className={classes.remainingTime} item sm={12}>
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
                  <Grid className={classes.totalTime} item sm={12}>
                    {task.totalTime ? `Completed in: ${task.totalTime}` : null}
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3} style={{ textAlign: 'center' }}>
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
                </Grid>
              </Grid>
            </CustomListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default TaskList;
