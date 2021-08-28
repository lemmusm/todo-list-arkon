import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStatusPaused,
  setRemainingTime,
  currentTask,
  setStatusReset,
  setCompletedTask,
} from '../redux/taskSlice';

export const useCountdownTimer = () => {
  // redux selectors/dispach
  const dispatch = useDispatch();
  const task = useSelector(currentTask);

  // destructuring task
  const {
    id,
    isPaused,
    isReset,
    duration,
    remainingTime: { hours, minutes, seconds },
  } = task;

  // render to calculate remaining time and set status reset
  useEffect(() => {
    if (!isPaused) {
      // get HHMMSS

      // set calculated time with duration task
      if (hours === 0 && minutes === 0 && seconds === 0) calculateRemainingTime(duration);

      // If isPaused is false and hours, minutes and seconds are != 0 change reset state
      dispatch(setStatusReset({ id, isReset }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  // render to run countdown
  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        countdown();
      }, 1000);
      return () => clearTimeout(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, hours, minutes, seconds]);

  // convert minutes to HHMMSS
  const calculateRemainingTime = (duration) => {
    let minToSeconds = Number(duration) * 60;

    // set remaining time in the state
    dispatch(
      setRemainingTime({
        id,
        hours: Math.floor(minToSeconds / 3600),
        minutes: Math.floor((minToSeconds % 3600) / 60),
        seconds: Math.floor((minToSeconds % 3600) % 60),
      })
    );
  };

  // counter logic
  const countdown = () => {
    // do nothing if paused or over
    if (isPaused) return;

    // Time up
    if (hours === 0 && minutes === 0 && seconds === 0) {
      dispatch(setStatusPaused({ id, isReset }));
      dispatch(setStatusReset({ id, isReset }));
      dispatch(setCompletedTask(id));
    } else if (minutes === 0 && seconds === 0) {
      // decrement hour
      dispatch(setRemainingTime({ id, hours: hours - 1, minutes: 59, seconds: 59 }));
    } else if (seconds === 0) {
      // decrement minute
      dispatch(setRemainingTime({ id, hours: hours, minutes: minutes - 1, seconds: 59 }));
    } else {
      // decrement seconds
      dispatch(setRemainingTime({ id, hours: hours, minutes: minutes, seconds: seconds - 1 }));
    }
  };

  // control to pause/play button
  const handleInitCounter = (id) => {
    dispatch(setStatusPaused({ id, isPaused }));
  };

  const handleResetCounter = (id) => {
    dispatch(
      setRemainingTime({
        id,
        hours: 0,
        minutes: 0,
        seconds: 0,
      })
    );
    dispatch(setStatusReset({ id, isReset }));
  };

  return { handleInitCounter, handleResetCounter };
};
