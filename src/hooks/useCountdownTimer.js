import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStatusPaused,
  setRemainingTime,
  currentTask,
  setStatusReset,
  setCompletedTask,
  allTasks,
} from '../redux/taskSlice';
import useUnload from './useUnload';

export const useCountdownTimer = () => {
  // redux selectors/dispach
  const dispatch = useDispatch();
  const task = useSelector(currentTask);
  const tasks = useSelector(allTasks);

  // get selected task
  const getSelectedTask = (id) => {
    const task = tasks.filter((task) => task.id === id);
    return task[0];
  };

  // calculate time to complete task
  const calculateTimeToComplete = (id, duration) => {
    // get remaining time from task selected
    const {
      remainingTime: { hours, minutes, seconds },
    } = getSelectedTask(id);

    // calculate the difference between the start time and the elapsed time
    const hoursToSeconds = hours * 3600;
    const minutesToSeconds = minutes * 60;
    const secondsToSeconds = seconds % 60;
    const totalSeconds = hoursToSeconds + minutesToSeconds + secondsToSeconds;
    const secondsToMinutes = totalSeconds / 60;

    // get difference in minutes
    const differenceInMinutes = duration - secondsToMinutes;

    // get time in hhmmss
    const { hrs, mins, secs } = calculateHHMMSS(differenceInMinutes);

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // destructuring current task
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
      // set calculated time with duration task
      if (hours === 0 && minutes === 0 && seconds === 0) {
        const { hrs, mins, secs } = calculateHHMMSS(duration);
        // set remaining time in the state
        dispatch(
          setRemainingTime({
            id,
            hours: hrs,
            minutes: mins,
            seconds: secs,
          })
        );
      }

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
  const calculateHHMMSS = (duration) => {
    let segundos = Number(duration) * 60;
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return { hrs, mins, secs };
  };

  // counter logic
  const countdown = () => {
    // do nothing if paused or over
    if (isPaused) return;

    // Time up
    if (hours === 0 && minutes === 0 && seconds === 0) {
      dispatch(setStatusReset({ id, isReset }));

      // get total time to complete task
      const totalTime = calculateTimeToComplete(id);
      dispatch(setCompletedTask({ id, totalTime, isPaused }));
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
    // get is Paused from task selected
    const { isPaused } = getSelectedTask(id);
    // dispatch action to init or pause
    dispatch(setStatusPaused({ id, isPaused }));
  };

  const handleResetCounter = (id) => {
    if (!isPaused) dispatch(setStatusPaused({ id, isPaused }));
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

  // Custom hook to pause countdown if is play when refresh page or close tab
  useUnload((e) => {
    if (!isPaused) {
      e.preventDefault();
      dispatch(setStatusPaused({ id, isPaused }));
    }
  });

  return { handleInitCounter, handleResetCounter, calculateTimeToComplete };
};
