import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addTask } from '../redux/taskSlice';
import { useForm } from 'react-hook-form';

export const useCreateTask = () => {
  // navigation
  const history = useHistory();

  // manage redux
  const dispatch = useDispatch();

  // state for duration select
  const [duration, setDuration] = useState('');

  // initialize react form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // proccess to create task
  const handleNewTask = (data) => {
    // dispatch to call action creator in the reducer
    dispatch(addTask(data));
    // navigate to root route
    history.push('/');
  };

  // handle change value for duration selection
  const handleChangeDuration = (event) => {
    const value = event.target.value;
    setDuration(value);
  };

  // return properties
  return {
    handleNewTask,
    register,
    formState: { errors },
    duration,
    handleChangeDuration,
    handleSubmit,
  };
};
