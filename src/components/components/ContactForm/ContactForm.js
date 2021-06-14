import React from 'react'
import {FormControl,FormHelperText, makeStyles} from '@material-ui/core';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import styled from 'styled-components';

const Container = styled.div`
    background-color: ${props => props.theme.palette.background.secondary};
    font-family: ${(props) => props.theme.typography.fontFamily};
    padding: 30px;
    
`
export const ContactForm = () => {
    return (
        <Container>
            
        </Container>
    )
}

