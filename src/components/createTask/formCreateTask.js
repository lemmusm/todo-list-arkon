import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { useCreateTask } from '../../hooks/useCreateTask';

// style
const useStyles = makeStyles((theme) => ({
  title: theme.mixins.toolbar,
  errorMsj: {
    color: red[500],
    fontSize: 12,
  },
  formControl: {
    minWidth: 120,
  },
}));

const FormCreateTask = () => {
  // get classes from style
  const classes = useStyles();

  // access to properties of custom hook
  const {
    handleNewTask,
    register,
    formState: { errors },
    handleChangeDuration,
    duration,
    handleSubmit,
  } = useCreateTask();

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Create task
      </Typography>
      <form onSubmit={handleSubmit(handleNewTask)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              {...register('name', { required: true })}
              name="name"
              label="Task name"
              placeholder="Task name"
              fullWidth
              variant="outlined"
            />
            <Typography className={classes.errorMsj}>
              {errors.name?.type === 'required' && 'Task name is required'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              {...register('description', { required: true })}
              name="description"
              label="Task description"
              placeholder="Task description"
              multiline
              maxRows={4}
              fullWidth
              variant="outlined"
            />
            <Typography className={classes.errorMsj}>
              {errors.description?.type === 'required' &&
                'Description is required'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="duration-label">Duration</InputLabel>
              <Select
                labelId="duration-label"
                id="duration"
                label="duration"
                name="duration"
                {...register('duration', { required: true })}
                value={duration}
                onChange={handleChangeDuration}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={30}>Short - 30min.</MenuItem>
                <MenuItem value={45}>Medium - 45min.</MenuItem>
                <MenuItem value={60}>Long - 1hr.</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            container
            direction="row"
            justifyContent="flex-end"
          >
            <Button type="submit" variant="contained" color="primary">
              Create task
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FormCreateTask;
