import React,{useEffect,useCallback} from "react";
import { useSelector,useDispatch } from "react-redux"
import {authSelectors,authActions} from "@Core/redux/auth"
import {currentUserActions,currentUserSelectors} from "@Core/redux/user";


export const useAuth=(canRelogin=false)=>{

const isLogin=useSelector(authSelectors.selectIsLogin);
const userId=useSelector(authSelectors.selectCurrentUserId);
const permission = useSelector(authSelectors.selectCurrentUserPermissions)
const authLoading=useSelector(authSelectors.selectAuthLoadingStatus);
const user=useSelector(currentUserSelectors.selectUserInfo);

const dispatch=useDispatch();

useEffect(() => {
    if(isLogin && !user&&canRelogin){
        dispatch(currentUserActions.getCurrentUser({id:userId}))
    }

},[userId,isLogin]);

useEffect(() =>{
    // For relogin need cookie for keep signin
    if(!isLogin && user===null&&canRelogin){
dispatch(authActions.reLogin())
    }
},[])



const signOut=useCallback(()=>{
dispatch(authActions.logOut());
})

const signIn=useCallback((data)=>{
    // Data is email and password we will destructure it later
    dispatch(authActions.userLogin(data));
},[])



return {
    ...user,
    isLogin,
    userId,
    permission,
    authLoading,
    signOut,
    signIn
}

}