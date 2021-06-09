import React,{useState,useEffect} from 'react';


export const useLocationNameByCoordinate=({latitude,longtitude,open=true})=>{
const [locationName,setLocationName]=useState("Unknown");


useEffect(()=>{
if(latitude && longtitude && open){
    fetch(`https://api.opencagedata.com/geocode/v1/json?key=0f05f309728b4eabae698da3ca5478ee&q=${latitude} ${longtitude}&pretty=1`)
    .then(response=>{return response.json()})
    .then(value=>{
        setLocationName(value.results[0].formatted.replace("unnamed road,",""));
    })
    .catch(err=>{
        setLocationName("Unknown");
    })

}

},[latitude,longtitude])


return locationName;
}