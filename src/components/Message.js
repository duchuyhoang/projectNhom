import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@Core/redux/auth';
import { roomSelectors, roomActions } from '@Core/redux/room'
import { PromotionRequest } from './pages/Users/PromotionRequest';
import { CNPreviewImage } from './shared/CNPreviewImage/CNPreviewImage';


const Message = ({ message }) => {
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(roomActions.getPendingRoom());
},[])

 const pendingRoom= useSelector(roomSelectors.pendingRoomSelectAll)

  return (
    <>
   <CNPreviewImage src={"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"}/>
   
    </>

  );
};


export default Message