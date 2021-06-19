import RoomCard from '@Components/components/RoomCard/RoomCard';
import { CNSnackBar } from '@Components/shared/CNSnackBar/CNSnackBar';
import { roomActions, roomSelectors } from '@Core/redux/room';
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import './HomeListRoom.css';

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
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };


  return (
    <>
      <CNSnackBar severity="info" isOpen={isOpen} onClose={handleClose}>
        Bạn phải login để xem phòng
      </CNSnackBar>
      {listRoom && listRoom?.length > 0 ? (
        <Slider {...settings} className={classes.slider}>
          {listRoom.map((room, index) => {
            console.log("d",room);
            return (
              <RoomCard
                id_user={room.belongTo}
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
                linkTo={`/properties/${room.name_router}`}
                handleClick={handleOpen}
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
