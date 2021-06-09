import React, {useEffect, useState} from 'react';
import { axiosApi } from "@Core/api/axiosApi";

export const useGetSquareAndPrice = () =>{
    const [squareRange,setSquareRange] = useState(null);
    const [priceRange,setPriceRange] = useState(null);
    useEffect(()=>{
        const getData = async () => {
          await axiosApi.get('room/getPriceRange').then(value => {
             if(value.data.data !== null)
                setPriceRange(value.data.data)
             else
                setPriceRange(null)   
          })
          await axiosApi.get('room/getAcreageRange').then(value => {
             if(value.data.data !== null)
                setSquareRange(value.data.data)
                else
                setSquareRange(null)
          })
        }
        getData();
    },[])
    return {
         squareRange,
         priceRange,
         setSquareRange,
         setPriceRange
    }
}