import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  gridImage: (props) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250 ,1fr)',
    gridTemplateRows: '300px 300px',
    gridGap: '1px',
    maxHeight: '600px',
    overflow: 'hidden',
    gridTemplateAreas:
      props.length === 5
        ? "'i1 i1 i2 i3' 'i1 i1 i4 i5'"
       
        : "'i1 i1 i2 i3' 'i1 i1 i4 i5'",
  }),
  imageItem: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    backgroundSize: 'cover',
    '&:first-child': {
      gridArea: 'i1',
    },
    '&:nth-child(2)': {
      gridArea: 'i2',
    },
    '&:nth-child(3)': {
      gridArea: 'i3',
    },
    '&:nth-child(4)': {
      gridArea: 'i4',
    },
    '&:nth-child(5)': {
      gridArea: 'i5',
    },
  },
}));

function RoomSlide({ data }) {
  const classes = useStyles({ length: data.length });
  return (
    <div className={classes.gridImage}>
      {data.map((item, index) => (
        <img src={item.imagesLinks} className={classes.imageItem} key={index} />
      ))}
    </div>
  );
}

export default RoomSlide;
