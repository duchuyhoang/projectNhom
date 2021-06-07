import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './styles.css';

const useStyles = makeStyles((theme) => ({}));

function RoomSlide({ data }) {
  const classes = useStyles();
  return (
    <div class="grid-image">
      {data.map((item) => (
        <img src={item.image} className="image-item" />
      ))}
    </div>
  );
}

export default RoomSlide;
