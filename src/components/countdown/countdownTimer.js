import { Grid } from '@material-ui/core';
import React from 'react';

const CountdownTimer = ({ hours, minutes, seconds }) => {
  return (
    <>
      <Grid>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`}</Grid>
    </>
  );
};
export default CountdownTimer;
