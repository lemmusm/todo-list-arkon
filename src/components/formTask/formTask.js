import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { useTask } from '../../hooks/useTask';
import { Controller } from 'react-hook-form';

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
  form: {
    background: 'white',
    borderRadius: '10px',
    padding: '2em',
  },
}));

const FormTask = () => {
  // get classes from style
  const classes = useStyles();

  // access to properties of custom hook
  const { isAddForm, handleNewEditTask, control, formState, handleSubmit } =
    useTask();

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(handleNewEditTask)}>
        <Typography variant="h5" className={classes.title}>
          {isAddForm ? 'Create new task' : 'Edit task'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name task is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Task name"
                  placeholder="Task name"
                  multiline
                  fullWidth
                  variant="outlined"
                  disabled={isAddForm ? false : true}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description task is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Task description"
                  placeholder="Task description"
                  multiline
                  maxRows={4}
                  fullWidth
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="duration-label">Duration</InputLabel>
              <Controller
                control={control}
                name="duration"
                rules={{ required: 'Description task is required' }}
                render={({ field, fieldState: { error } }) => (
                  <Select {...field} error={!!error}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={30}>Short - 30min.</MenuItem>
                    <MenuItem value={45}>Medium - 45min.</MenuItem>
                    <MenuItem value={60}>Long - 1hr.</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText className={classes.errorMsj}>
                {formState.errors.duration?.type === 'required' &&
                  'Select a duration for the task'}
              </FormHelperText>
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
              {isAddForm ? 'Create task' : 'Edit task'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FormTask;
