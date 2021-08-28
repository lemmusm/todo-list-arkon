import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  currentTask,
  editTask,
  setRemainingTime,
  setStatusPaused,
  setStatusReset,
} from '../redux/taskSlice';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export const useTask = () => {
  // manage redux
  const task = useSelector(currentTask);
  const { isReset, isPaused } = task;
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
          name: task.name,
          description: task.description,
          duration: task.duration,
        },
  });

  // when load edit form, if counter is running it pause
  useEffect(() => {
    if (!isPaused) dispatch(setStatusPaused({ id, isPaused }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // proccess to create/edit task
  const handleNewEditTask = (data) => {
    // dispatch to call action creator in the reducer depending if is new or edit mode
    if (isAddForm) {
      dispatch(addTask(data));
    } else {
      // if duration is updated reset the timer
      if (task.duration !== data.duration) {
        dispatch(
          setRemainingTime({
            id,
            hours: 0,
            minutes: 0,
            seconds: 0,
          })
        );
        dispatch(setStatusReset({ id, isReset }));
      }
      dispatch(editTask({ id, data }));
    }

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
