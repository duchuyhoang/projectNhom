import React, { useState, useEffect } from 'react';
import RoomCard from '@Components/components/RoomCard/RoomCard';
import { useDispatch, useSelector } from 'react-redux';
import { roomActions, roomSelectors } from '@Core/redux/room';
import Slider from 'react-slick';
import './HomeListRoom.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  dots: {
    '& > li': {
      transition: 'all 0.3s ease-in-out 0s',
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      boxSizing: 'border-box',
      textAlign: 'center',
      margin: '0 4px',
      border: '0',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
    },
  },
  slider: {
    '& > .slick-list': {
      padding: '25px 0',
    },
  },
}));

export const HomeListRoom = () => {
  const classes = useStyles();
  const listRoom = useSelector(roomSelectors.homeRoomSelectAll) || [];
  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    autoplay: true,

    speed: 500,
    slidesToShow: listRoom && listRoom.length > 3 ? 3 : 3,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          bottom: '-30px',
        }}
      >
        <ul className={classes.dots}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => <button> </button>,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(roomActions.getLatestHomeRoom());
  }, []);

  console.log(listRoom);

  // if(listRoom?.l)

  return (
    <>
      {listRoom && listRoom?.length > 0 ? (
        <Slider {...settings} className={classes.slider}>
          {listRoom.map((room, index) => {
            return (
              <RoomCard
                key={index}
                name={room.name}
                city={room.cityName}
                district={room.districtName}
                ward={room.wardName}
                list_images={room?.images || []}
                price={room.water_bill + room.price + room.utility_bill}
                capacity={room.capacity}
                acreage={room.acreage}
                user_name={room.user_name}
                user_avatar={room.user_avatar}
                list_utilities={room.utilities}
                createTime={room.createTime}
              />
            );
          })}
        </Slider>
      ) : (
        <div>Chưa có phòng nào</div>
      )}
    </>
  );
};
