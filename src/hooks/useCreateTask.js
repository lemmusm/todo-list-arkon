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
  const [modalOpen, setModalOpen] = useState(false);

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

    // when select "custom duration" open modal
    if (value === 0) {
      setModalOpen(true);
    }
  };

  // handle close modal, when modal is close duration value = '' (None)
  const handleCloseModal = () => {
    setModalOpen(false);
    setDuration('');
  };

  // handle set custom duration
  const handleAcceptModal = (value) => {
    setDuration(value);
    setModalOpen(false);
  };

  // return properties
  return {
    handleNewTask,
    register,
    formState: { errors },
    duration,
    handleChangeDuration,
    modalOpen,
    handleCloseModal,
    handleAcceptModal,
    handleSubmit,
  };
};
