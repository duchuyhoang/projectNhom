import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CNButton } from "@Components/shared/CNButton/CNButton";
import useIsMobile from "@Core/hooks/useIsMobile";
import styled from 'styled-components';

const useStretcherStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "150px",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    justifyContent:"space-between",
    fontFamily:theme.typography.fontFamily
  },
  
  rootMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "180px",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    fontFamily:theme.typography.fontFamily
  },

  textStyle: {
    textAlign:"center",
    height:"100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  textStyleMobile: {
    width: "100%",
    height:"100%",
    display: "flex",
    marginLeft: "16px",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  styleBtn: {
    width: "200px",
    height: "60px",
    backgroundColor:"#FF787C",
    "&:hover" :{
      backgroundColor:'#fff' 
    }  
  },

  styleDivBtn: {
    width:"100%",
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",
  },

  styleDivBtnMobile: {
    display: "inline-block",
    marginLeft: "16px",    
    height:"100%",
    margin:"0 16px 0 0"
  }

}))


export const Stretcher = (props) => {
const {isMobile}=useIsMobile();
console.log("Is mobile",isMobile);

  const stretcherStyle = useStretcherStyles()
  const HeaderComponent = isMobile ? styled.h1`
      color: #fff;
      font-size:22px;
      margin:0;
      margin: 16px 0 16px 0;
    `
    : styled.h1`
      color: #fff;
      font-size:30px;
      margin:0;
    `
  const BodyComponent = isMobile ? styled.p`
      color:#fff;
      margin: -18px 0 0 0;
      font-size:14px;
  `
  : styled.p`
      color:#fff;
      margin: -34px 0 0 0;
  `

  return (
    <div className={isMobile ? stretcherStyle.rootMobile: stretcherStyle.root  }  >
      <div className={isMobile ? stretcherStyle.textStyleMobile : stretcherStyle.textStyle} >
        <HeaderComponent className={stretcherStyle.styleHeader}>Become a Real Estate Agent</HeaderComponent>
        <BodyComponent className={stretcherStyle.styleBody} >We only work with the best companies around the globe</BodyComponent>
      </div>

      <div className={ isMobile ?  stretcherStyle.styleDivBtnMobile: stretcherStyle.styleDivBtn} >       
          <CNButton type="main" className={stretcherStyle.styleBtn} >Register Now</CNButton>
      </div>
      
    </div>

  )

}