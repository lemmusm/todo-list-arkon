import React from 'react';

const CountdownTimer = ({ hours, minutes, seconds }) => {
  return (
    <div>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`}</div>
  );
};
export default CountdownTimer;
