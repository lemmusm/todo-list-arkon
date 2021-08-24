import { useDispatch, useSelector } from 'react-redux';
import { editTask, removeTask, completedTask } from '../redux/taskSlice';

export const useTaskList = () => {
  const tasks = useSelector((state) => state.taskReducer.tasks);
  const dispatch = useDispatch();

  // Order
  const tasksReverse = [...tasks].sort((a, b) => b.isUpdated - a.isUpdated);

  // filter uncomplete
  const uncompleteTasks = tasksReverse.filter(
    (task) => task.isComplete === false
  );

  const completeTasks = tasksReverse.filter((task) => task.isComplete === true);

  // delete task
  const handleDeleteTask = (id) => {
    dispatch(removeTask(id));
  };

  // edit task
  const handleEditTask = (id, description, duration) => {
    dispatch(editTask(id, description, duration));
  };

  // mark task as completed
  const handleCompleteTask = (id) => {
    dispatch(completedTask(id));
  };

  return {
    tasksReverse,
    handleEditTask,
    handleDeleteTask,
    handleCompleteTask,
    uncompleteTasks,
    completeTasks,
  };
};
