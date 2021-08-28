import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeTask,
  setCompletedTask,
  getEditTask,
  allTasks,
  setToggleTasks,
  toggleState,
  filterTasks,
  setFilterTasks,
} from '../redux/taskSlice';

export const useTaskList = () => {
  const tasks = useSelector(allTasks);
  const fTasks = useSelector(filterTasks);
  const toggle = useSelector(toggleState);
  const dispatch = useDispatch();

  // Descending order tasks descending
  const tasksReverse = [...tasks].sort((a, b) => b.isUpdated - a.isUpdated);

  // filter uncomplete tasks
  const uncompleteTasks = tasksReverse.filter((task) => task.isComplete === false);

  // filter complete tasks
  const completeTasks = tasksReverse.filter((task) => task.isComplete === true);

  // dispatch action creator to delete task
  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
  };

  // dispatch action creator to get to seleted task
  const handleGetEditTask = (id) => {
    dispatch(getEditTask(id));
  };

  // dispatch action creator to mark task as completed
  const handleCompleteTask = (id) => {
    dispatch(setCompletedTask(id));
  };

  // toggle tasks
  const handleChangeToggle = () => {
    dispatch(setToggleTasks(toggle));
  };

  useEffect(() => {
    toggle ? dispatch(setFilterTasks(completeTasks)) : dispatch(setFilterTasks(uncompleteTasks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, tasks]);

  return {
    handleGetEditTask,
    handleDeleteTask,
    handleCompleteTask,
    fTasks,
    handleChangeToggle,
    toggle,
  };
};
