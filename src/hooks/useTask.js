import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../redux/taskSlice';
import { useForm } from 'react-hook-form';

export const useTask = () => {
  // manage redux
  let currentTask = useSelector((state) => state.taskReducer.currentTask);
  const dispatch = useDispatch();

  // get id param from url
  const { id } = useParams();
  const isAddForm = !id;
  // navigation
  const history = useHistory();

  // initialize react form
  const { control, handleSubmit, formState } = useForm({
    defaultValues: isAddForm
      ? { name: '', description: '', duration: '' }
      : {
          name: currentTask.name,
          description: currentTask.description,
          duration: currentTask.duration,
        },
  });

  // proccess to create task
  const handleNewEditTask = (data) => {
    // dispatch to call action creator in the reducer depending if is new or edit mode
    isAddForm ? dispatch(addTask(data)) : dispatch(editTask({ id, data }));

    // navigate to root route
    history.push('/');
  };

  // return properties
  return {
    isAddForm,
    handleNewEditTask,
    control,
    formState,
    handleSubmit,
  };
};
