import React from 'react';
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  withStyles,
} from '@material-ui/core';
import { deepPurple, teal } from '@material-ui/core/colors';
import CountdownTimer from '../countdown/countdownTimer';
import ControlsCountdown from '../countdown/controlsCountdown';
import ActionsTask from './actionsTask';

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

const useStyles = makeStyles((theme) => ({
  remainingTime: {
    color: deepPurple[900],
    fontWeight: 'bold',
    fontSize: '.8em',
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

const Item = ({ task }) => {
  // get classes from style
  const classes = useStyles();

  return (
    <CustomListItem disabled={task.isComplete ? true : false}>
      <Grid container item direction="row" justifyContent="center" alignItems="center">
        {task.isComplete ? null : (
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
        )}
        <Grid item xs={12} sm={task.isComplete ? 12 : 6}>
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
        {task.isComplete ? null : (
          <Grid item xs={12} sm={3} style={{ textAlign: 'center' }}>
            <ActionsTask task={task} />
          </Grid>
        )}
      </Grid>
    </CustomListItem>
  );
};

export default Item;
