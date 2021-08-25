import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slider,
  withStyles,
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

// style
const CustomSliderDuration = withStyles({
  root: {
    color: deepPurple['A700'],
    height: 8,
    paddingTop: '3em',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles((theme) => ({
  'MuiTypography-root': {
    fontFamily: 'Barlow',
  },
  slider: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    margin: '0 auto',
  },
}));

const ModalSlider = ({ modalOpen, handleCloseModal, handleAcceptModal }) => {
  // get classes from style
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState(5);
  // get value from slider
  const getValueSlider = (value) => {
    setSliderValue(value);
    return value;
  };

  return (
    <div>
      <Dialog aria-labelledby="responsive-dialog-title" open={modalOpen}>
        <DialogTitle id="responsive-dialog-title">
          {'Select custom duration in minutes'}
        </DialogTitle>
        <CustomSliderDuration
          className={classes.slider}
          defaultValue={5}
          getAriaValueText={getValueSlider}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={5}
          min={5}
          max={120}
        />
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleAcceptModal(sliderValue)}
            color="primary"
            autoFocus
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalSlider;
