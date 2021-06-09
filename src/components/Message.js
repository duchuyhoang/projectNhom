import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stretcher } from '@Components/components/Stretcher/Stretcher';
import { Footer } from '@Components/components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@Core/redux/auth';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { CooperateForm } from './components/CooperateForm/CooperateForm';
import { CNSelect } from '@Components/shared/CNSelect/CNSelect';
import { components } from 'react-select';
import CNStar from './shared/CNStar/CNStar';
import { CNPropertyLabel } from './shared/CNPropertyLabel/CNPropertyLabel';
import { CNTab } from './shared/CNTab/CNTab'
import { roomSelectors, roomActions } from '@Core/redux/room'
import { createSelector } from "reselect";
import {SearchRoom} from '../components/components/SearchRoom/SearchRoom'
import {Map} from "@Components/components/Map/Map";


const Message = ({ message }) => {

const [selectLocation,setSelectLocation]=useState({latitude:null,longtitude:null})

  return (

  <div style={{backgroundColor: 'red', width: '100vw', height: '100vh'}}>
   <div style={{height: '200px'}}></div>
  <SearchRoom/>
  </div>
    
   
  );
};


export default Message