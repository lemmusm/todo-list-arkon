import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { allTasks, setFilterTasks } from '../redux/taskSlice';

const useFilters = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(allTasks);

  // react form instance
  const { control, formState } = useForm();

  // Descending order tasks descending
  const tasksReverse = [...tasks].sort((a, b) => b.isUpdated - a.isUpdated);

  // set filter to tasks
  const shortTasks = tasksReverse.filter((task) => task.duration <= 30);
  const mediumTasks = tasksReverse.filter((task) => task.duration > 30 && task.duration <= 60);
  const largeTasks = tasksReverse.filter((task) => task.duration > 60);

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
      : dispatch(setFilterTasks([]));
  };

  useEffect(() => {
    dispatch(setFilterTasks([]));
  }, [dispatch]);

  return { control, formState, handleChangeSelectedFilter };
};

export default useFilters;
