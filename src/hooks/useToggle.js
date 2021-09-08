import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { allTasks, setFilterTasks, setToggleTasks, toggleState } from '../redux/taskSlice';

const useToggle = () => {
  // redux
  const tasks = useSelector(allTasks);
  const toggle = useSelector(toggleState);
  const dispatch = useDispatch();

  // get current path
  const { pathname } = useLocation();

  // Descending order tasks descending
  const tasksReverse = [...tasks].sort((a, b) => b.isUpdated - a.isUpdated);

  // set filter to tasks
  const uncompleteTasks = tasksReverse.filter((task) => task.isComplete === false);
  const completeTasks = tasksReverse.filter((task) => task.isComplete === true);

  // toggle tasks
  const handleChangeToggle = () => {
    dispatch(setToggleTasks(toggle));
  };

  // check current path to decide assign value to 'setFilterTasks' state
  useEffect(() => {
    if (pathname !== '/filtering-tasks')
      toggle ? dispatch(setFilterTasks(completeTasks)) : dispatch(setFilterTasks(uncompleteTasks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, tasks]);

  return { toggle, handleChangeToggle };
};

export default useToggle;
