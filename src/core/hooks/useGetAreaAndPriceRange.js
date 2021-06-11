import React, { useEffect, useState } from 'react';
import { axiosApi } from "@Core/api/axiosApi";

export const useGetAreaAndPriceRange = () => {
   const [areaRange, setAreaRange] = useState(null);
   const [priceRange, setPriceRange] = useState(null);

   useEffect(() => {
     
          axiosApi.get('room/getPriceRange').then(value => {
            if (value.data !== null) {
               setPriceRange([value.data.min_price, value.data.max_price]);
            }
            else
            setPriceRange(null)
         }).catch(err => {
            setPriceRange([0,50000000])
         })
          axiosApi.get('room/getAcreageRange').then(value => {
            if (value.data !== null) {
               setAreaRange([value.data.min_acreage, value.data.max_acreage]);
            }
            else
            setAreaRange(mull)
         }).catch(err => {
            setAreaRange([0,200000])
         })
   }, [])
   return {
      areaRange,
      priceRange,
      setAreaRange,
      setPriceRange
   }
}