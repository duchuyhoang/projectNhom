import React,{useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import { axiosApi } from '@Core/api/axiosApi';

export const useUserProfile=()=>{
const {id_user}=useParams();
console.log(id_user);
const [userInfo,setUserInfo]=useState(null);
const [loading,setLoading]=useState("pending");

useEffect(()=>{
if(id_user){
    axiosApi.get(`/user/${id_user}`).then(response=>{
        setLoading("fulfilled");
        console.log(response);
        setUserInfo(response.data)
    }).catch(error=>{
        setLoading("error")
    })
}
else{
    setLoading("error")
}
    
},[id_user])

return {
    id_user,
    userInfo,
    loading,
}

}