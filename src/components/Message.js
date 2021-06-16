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





const Message = ({ message }) => {
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(roomActions.getPendingRoom());
},[])


 const pendingRoom= useSelector(roomSelectors.pendingRoomSelectAll)

console.log(pendingRoom);

  return (
    <>
   
    <PromotionRequest />
    </>

  );
};


export default Message