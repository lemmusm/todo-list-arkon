import { FormControl, FormControlLabel, FormGroup, withStyles } from '@material-ui/core';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { deepPurple } from '@material-ui/core/colors';
import { useTaskList } from '../../hooks/useTaskList';
// style
const CustomSwitch = withStyles({
  root: {
    marginRight: '2em',
    '& .MuiSwitch-track': {
      backgroundColor: deepPurple[300],
    },
  },
  switchBase: {
    color: deepPurple[300],
    '&$checked': {
      color: deepPurple['A700'],
    },
    '&$checked + $track': {
      backgroundColor: deepPurple['A700'],
    },
  },
  checked: {},
  track: {},
})(Switch);

const ToggleTasks = () => {
  const { toggle, handleChangeToggle } = useTaskList();

  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="start"
          control={<CustomSwitch onChange={handleChangeToggle} checked={toggle} />}
          label="Completed tasks"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
};

export default ToggleTasks;
