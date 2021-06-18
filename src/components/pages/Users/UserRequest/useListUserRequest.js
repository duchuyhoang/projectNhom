import React,{ useState, useEffect,useCallback} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {adminActions,adminSelectors} from "@Core/redux/admin";


export const useListUserRequest=()=>{

const dispatch = useDispatch();
// const [userDataList,setuserDataList]=useState([])
const userDataList=useSelector(adminSelectors.pendingUserSelectAll);
const loading=useSelector(adminSelectors.pendingUserLoading);
const error=useSelector(adminSelectors.pendingUserError);
const [selectedInfo,setSelectedInfo]=useState({id_user:null,id:null});

useEffect(() => {
dispatch(adminActions.getUserPendingPromotionRequest());
},[])


const handleConfirm=useCallback(()=>{
    dispatch(adminActions.acceptUserPendingPromotionRequest({...selectedInfo}))
},[selectedInfo])

const handleReject=useCallback(()=>{
    dispatch(adminActions.rejectUserPendingPromotionRequest({...selectedInfo}))
},[selectedInfo])

return {
    userDataList,
    loading,
    error,
    selectedInfo,
    setSelectedInfo,
    handleConfirm,
    handleReject
}


}