import React,{useEffect,useLayoutEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {roomActions,roomSelectors} from "@Core/redux/room";


export const useCurrentRoom=(name_router)=>{
const loading=useSelector(roomSelectors.currentRoomLoading);
const currentRoom=useSelector(roomSelectors.selectCurrentRoom);
const currentRoomError=useSelector(roomSelectors.currentRoomError);
const dispatch = useDispatch();


useLayoutEffect(() => {
if(name_router){
    dispatch(roomActions.setSelectedRoomByNameRouter({name_router}));
}
},[name_router])


return {
    loading,
    currentRoom,
    currentRoomError
}



}