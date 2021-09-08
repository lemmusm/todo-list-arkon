import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { red } from '@material-ui/core/colors';
import useFilters from '../../hooks/useFilters';

// style
const useStyles = makeStyles((theme) => ({
  errorMsj: {
    color: red[500],
    fontSize: 12,
  },
  formControl: {
    minWidth: 120,
  },
}));
const SelectFilter = () => {
  // get classes from style
  const classes = useStyles();

  // access to properties of custom hook
  const { handleChangeSelectedFilter, control, formState } = useFilters();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="duration-label">Filter by duration </InputLabel>
      <Controller
        control={control}
        name="duration"
        rules={{ required: 'Select a filter duration' }}
        render={({ field, fieldState: { error } }) => (
          <Select
            {...field}
            error={!!error}
            onChange={(e) => handleChangeSelectedFilter(e)}
            defaultValue=""
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'short'}>Short</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'large'}>Long</MenuItem>
          </Select>
        )}
      />
      <FormHelperText className={classes.errorMsj}>
        {formState.errors.duration?.type === 'required' && 'Select a filter duration'}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectFilter;
