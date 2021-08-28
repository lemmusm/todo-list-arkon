import { useDispatch, useSelector } from 'react-redux';
import { removeTask, setCompletedTask, getEditTask, allTasks } from '../redux/taskSlice';

export const useTaskList = () => {
  const tasks = useSelector(allTasks);
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

  return {
    handleGetEditTask,
    handleDeleteTask,
    handleCompleteTask,
    uncompleteTasks,
    completeTasks,
  };
};
