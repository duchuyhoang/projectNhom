import React from 'react'
import styled,{css} from 'styled-components'
import { FormControl, FormHelperText, makeStyles } from '@material-ui/core';
import {backgroundImage} from '@Assets/images/bg-login.jpg';
// styled CSS
const alignCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`
// styled components
const Container = styled.div`
    padding: 6px;
    background-color: ${props => props.theme.palette.background.theme};
    border-radius: 6px;
    font-family: ${props => props.theme.typography.fontFamily};
    ${alignCenter};
`;
const LeftContainer = styled.div`
`
const RightContainer = styled.div`
`
export const  ForgetPasswordForm = () => {
    return (
       <Container>
           <LeftContainer>
               <img src={backgroundImage}/>
           </LeftContainer>
           <RightContainer>
              
           </RightContainer>
       </Container>
    )
}


