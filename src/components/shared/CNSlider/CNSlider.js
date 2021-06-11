import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useSliderContentStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'block',
      margin: 'auto',
      width: 300,
    },
    rail: {
      height: '6px',
      backgroundColor: theme.palette.text.primary,
    },
    track: {
      height: '6px',
    },
    thumb: {
      marginTop: -5,
      borderRadius: 0,
      height: 18,
      width: 18,
      backgroundColor: '#24324a',
      border: `2px solid ${theme.palette.text.secondary}`,
      '&:hover': {
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
      },
      '&:focus-visible': {
        boxShadow: 'none',
      },
    },
  };
});
export const CNSlider = ({ value, handleChange, ...rest }) => {
  const sliderStyles = useSliderContentStyles();
  return (
    <Slider
      classes={sliderStyles}
      value={value}
      onChange={handleChange}
      valuelabeldisplay="auto"
      aria-labelledby="range-slider"
      valuelabelcqomponent={'div'}
      {...rest}
      // getAriaValueText={valuetext}
    />
  );
};
