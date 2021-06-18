import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stretcher } from '@Components/components/Stretcher/Stretcher';
import { Footer } from '@Components/components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@Core/redux/auth';
import { roomSelectors, roomActions } from '@Core/redux/room'
import { createSelector } from "reselect";
import {SearchRoom} from '../components/components/SearchRoom/SearchRoom'
import {Map} from "@Components/components/Map/Map";
import {ForgetPasswordForm} from '@Components/components/ForgetPasswordForm/ForgetPasswordForm'
import { PromotionRequest } from './pages/Users/PromotionRequest';
import { ListUserRequest } from './pages/Users/ListUserRequest';

const userDataList = [{
  user_name: 'Hoang Duc Duy',
  user_avatar: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',
  user_phone: '0394567123',
  user_email: 'xxx@gmail.com',
  dateSubmited: '20210430'
},
{
  user_name: 'Hoang Duc Duy',
  user_avatar: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',
  user_phone: '0394567123',
  user_email: 'xxx@gmail.com',
  dateSubmited: '20210615'
},
{
  user_name: 'Hoang Duc Duy',
  user_avatar: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',
  user_phone: '0394567123',
  user_email: 'xxx@gmail.com',
  dateSubmited: '20210320'
},
{
  user_name: 'Hoang Duc Duy',
  user_avatar: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',
  user_phone: '0394567123',
  user_email: 'xxx@gmail.com',
  dateSubmited: '20210617'
},
{
  user_name: 'Hoang Duc Duy',
  user_avatar: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',
  user_phone: '0394567123',
  user_email: 'xxx@gmail.com',
  dateSubmited: '20210618'
}]


const Message = ({ message }) => {
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(roomActions.getPendingRoom());
},[])

 const pendingRoom= useSelector(roomSelectors.pendingRoomSelectAll)

console.log(pendingRoom);

  return (
    <>
   
    <ListUserRequest userDataList={userDataList}/>
    </>

  );
};


export default Message