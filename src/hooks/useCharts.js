import { useSelector } from 'react-redux';
import { allTasks } from '../redux/taskSlice';

export const useCharts = () => {
  const tasks = useSelector(allTasks);

  const names = tasks.map((task) => task.name);
  const durations = tasks.map((task) => task.duration);

  // return properties
  return {
    names,
    durations,
  };
};
