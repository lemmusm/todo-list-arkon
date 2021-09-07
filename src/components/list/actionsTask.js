import { Checkbox, IconButton, withStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { useTaskList } from '../../hooks/useTaskList';

const CustomCheckbox = withStyles({
  root: {
    '&$checked': {
      color: deepPurple[700],
    },
  },
  checked: {},
})(Checkbox);

const ActionsTask = ({ task }) => {
  // access to custom hook properties
  const { handleDeleteTask, handleCompleteTask, handleGetEditTask } = useTaskList();

  return (
    <>
      <IconButton onClick={() => handleGetEditTask(task.id, task.isPaused)}>
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          handleDeleteTask(task.id);
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
      <CustomCheckbox
        edge="end"
        value={task.isComplete}
        onChange={() => {
          handleCompleteTask(task.id, task.isPaused, task.duration);
        }}
      />
    </>
  );
};

export default ActionsTask;
