import React from 'react';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import { Grid, IconButton } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import StopIcon from '@material-ui/icons/Stop';

const ControlsCountdown = ({ id, isPaused, isReset, isComplete }) => {
  const { handleInitCounter, handleResetCounter } = useCountdownTimer();

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item sm={6}>
        <IconButton onClick={() => handleInitCounter(id)}>
          {isPaused ? (
            <PlayCircleFilledIcon fontSize="large" />
          ) : (
            <PauseCircleFilledIcon fontSize="large" />
          )}
        </IconButton>
      </Grid>
      <Grid item sm={6}>
        {isReset ? null : (
          <IconButton onClick={() => handleResetCounter(id)}>
            <StopIcon fontSize="small" />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default ControlsCountdown;
