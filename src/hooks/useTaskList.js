import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeTask, completedTask, getEditTask } from '../redux/taskSlice';

export const useTaskList = () => {
  const tasks = useSelector((state) => state.taskReducer.tasks);
  const dispatch = useDispatch();

  // navigation
  const history = useHistory();

  // Descending order tasks descending
  const tasksReverse = [...tasks].sort((a, b) => b.isUpdated - a.isUpdated);

  // filter uncomplete tasks
  const uncompleteTasks = tasksReverse.filter(
    (task) => task.isComplete === false
  );

  // filter complete tasks
  const completeTasks = tasksReverse.filter((task) => task.isComplete === true);

  // dispatch action creator to delete task
  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
  };

  // dispatch action creator to get to seleted task
  const handleGetEditTask = (id) => {
    dispatch(getEditTask(id));
    history.push(`/details-task/${id}`);
  };

  // dispatch action creator to mark task as completed
  const handleCompleteTask = (id) => {
    dispatch(completedTask(id));
  };

  return {
    tasksReverse,
    handleGetEditTask,
    handleDeleteTask,
    handleCompleteTask,
    uncompleteTasks,
    completeTasks,
  };
};
