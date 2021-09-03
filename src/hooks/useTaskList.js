import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  removeTask,
  setCompletedTask,
  getEditTask,
  allTasks,
  setToggleTasks,
  toggleState,
  filterTasks,
  setFilterTasks,
  setStatusPaused,
} from '../redux/taskSlice';
import { useCountdownTimer } from './useCountdownTimer';

export const useTaskList = () => {
  // redux
  const tasks = useSelector(allTasks);
  const fTasks = useSelector(filterTasks);
  const toggle = useSelector(toggleState);
  const dispatch = useDispatch();
  const { calculateTimeToComplete } = useCountdownTimer();

  // get current path
  const { pathname } = useLocation();
  const history = useHistory();

  // Descending order tasks descending
  const tasksReverse = [...tasks].sort((a, b) => b.isUpdated - a.isUpdated);

  // set filter to tasks
  const uncompleteTasks = tasksReverse.filter((task) => task.isComplete === false);
  const completeTasks = tasksReverse.filter((task) => task.isComplete === true);
  const shortTasks = tasksReverse.filter((task) => task.duration <= 30);
  const mediumTasks = tasksReverse.filter((task) => task.duration > 30 && task.duration <= 60);
  const largeTasks = tasksReverse.filter((task) => task.duration > 60);

  // react form instance
  const { control, handleSubmit, formState } = useForm();

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

  // toggle tasks
  const handleChangeToggle = () => {
    dispatch(setToggleTasks(toggle));
  };

  // handle when value of select changed
  const handleChangeSelectedFilter = (e) => {
    const value = e.target.value;

    // eslint-disable-next-line no-unused-expressions
    value === 'short'
      ? dispatch(setFilterTasks(shortTasks))
      : value === 'medium'
      ? dispatch(setFilterTasks(mediumTasks))
      : value === 'large'
      ? dispatch(setFilterTasks(largeTasks))
      : null;
  };

  // check current path to decide assign value to 'setFilterTasks' state
  useEffect(() => {
    if (pathname !== '/filtering-tasks')
      toggle ? dispatch(setFilterTasks(completeTasks)) : dispatch(setFilterTasks(uncompleteTasks));

    if (pathname === '/filtering-tasks') dispatch(setFilterTasks([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, tasks]);

  return {
    handleNewTask,
    handleGetEditTask,
    handleDeleteTask,
    handleCompleteTask,
    fTasks,
    handleChangeToggle,
    handleChangeSelectedFilter,
    toggle,
    control,
    handleSubmit,
    formState,
  };
};
