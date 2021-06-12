import React from 'react';
import styled from "styled-components"
import homeBackground from "@Assets/background/homeBg.jpg"

const Container=styled.section`
background-image: url(${homeBackground});
height:105vh;
background-size: cover;
background-repeat: no-repeat;
overflow:hidden;
background-position:center center;
`

const BackgroundOverFlay = styled.div`
background-color: rgba(29, 41, 62, 0.6);
height: 105vh;
`



export const FindHomeComponent=(props)=>{
return (
<>
<Container>
   <BackgroundOverFlay></BackgroundOverFlay> 
</Container>
</>
)


}