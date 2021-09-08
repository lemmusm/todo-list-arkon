import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  removeTask,
  setCompletedTask,
  getEditTask,
  filterTasks,
  setStatusPaused,
} from '../redux/taskSlice';
import { useCountdownTimer } from './useCountdownTimer';

export const useTaskList = () => {
  // redux
  const fTasks = useSelector(filterTasks);
  const dispatch = useDispatch();
  const { calculateTimeToComplete } = useCountdownTimer();

  // navigation
  const history = useHistory();

  // dispatch action creator to delete task
  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
  };

  // dispatch action creator to get to seleted task
  const handleNewTask = (id, isPaused) => {
    dispatch(setStatusPaused({ id, isPaused }));
    history.push(`/new-task`);
  };

  // dispatch action creator to get to seleted task
  const handleGetEditTask = (id) => {
    dispatch(getEditTask(id));
    history.push(`/details-task/${id}`);
  };

  // dispatch action creator to mark task as completed
  const handleCompleteTask = (id, isPaused, duration) => {
    // get total time to complete task
    const totalTime = calculateTimeToComplete(id, duration);
    // dispatch action to mark as complete
    dispatch(setCompletedTask({ id, totalTime, isPaused }));
  };

  return {
    fTasks,
    handleNewTask,
    handleGetEditTask,
    handleDeleteTask,
    handleCompleteTask,
  };
};
