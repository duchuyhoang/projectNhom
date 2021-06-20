import React,{useState} from 'react'
import {FormControl, FormHelperText, makeStyles} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styled from 'styled-components';
import { CNTextField} from '@Components/shared/CNTextField/CNTextField';
import CNStar from '@Components/shared/CNStar/CNStar'
import {CNButton} from '@Components/shared/CNButton/CNButton';

const useReviewFormStyles = makeStyles((theme)=>({
    form:{
        width: '100%'
    },
    controller:{
        width: '48%',
        marginBottom: 30,
        position: "relative"
    },
    commentTextField:{
        width: "100%",
        marginBottom: 30
    },
    helperText:{
        position:"absolute",
        color: theme.palette.primary.main,
        bottom: -20
    }
}))

const Container = styled.div`
    font-family:${(props) => props.theme.typography.fontFamily};
    padding-bottom: 20px;

`
const Title = styled.h3`
    margin-bottom: 10px;
`
const RattingWrapper = styled.div`
    margin-bottom: 20px;
`
const Row = styled.div`
display: flex;
justify-content: space-between;
width:100%;
`
export const ReviewForm = () => {
    const reviewFormStyles = useReviewFormStyles();
    const [starRating, setStarRating] = useState(5);
    const starRatingHandler = (e) => {
        setStarRating(e.target.value);
    }
    const defaultValues = {
        name: '', 
        email: '',
        comment:''
    }
    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên của bạn'),
        email: yup.string().required('Vui lòng nhập email của bạn').email('Email không hợp lệ')
    })
    const { control, formState, handleSubmit} = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(schema)
    })
    const addReviewHandler = (values) => {
    }
    return (
        <Container>
            <Title>Add a Review</Title>
            <RattingWrapper>
                <CNStar value={starRating} size='large' onChange={starRatingHandler}/>
            </RattingWrapper>
            <form className={reviewFormStyles.form} onSubmit={handleSubmit(addReviewHandler)}>
            <Row>
                <Controller
   
                name = "name"
                control={control}
                render = {({ field: { onChange, value}}) => (
                    <FormControl   className={reviewFormStyles.controller}>
                        <CNTextField
                        fullWidth
                        name = "name"
                        type="text"
                        placeholder="Your name"
                        error={!!formState.errors['name']}
                        inputChange={e => onChange(e)}
                        value={value ? value : ''}

                        />
                         <FormHelperText className={reviewFormStyles.helperText} >
                      {formState.errors['name']?.message}
                    </FormHelperText>
                    </FormControl>
                )}
                />
                <Controller
                    
                name = "email"
                control={control}
                render = {({ field: { onChange, value}}) => (
                    <FormControl className={reviewFormStyles.controller}>
                        <CNTextField
                        fullWidth
                        name = "email"
                        type="email"
                        placeholder="Your email"
                        error={!!formState.errors['email']}
                        inputChange={e => onChange(e)}
                        value={value ? value : ''}

                        />
                         <FormHelperText className={reviewFormStyles.helperText}>
                      {formState.errors['email']?.message}
                    </FormHelperText>
                    </FormControl>
                )}
                />
                </Row>
                <Row>
                <Controller
                name = "comment"
                control={control}
                render = {({ field: { onChange, value}}) => (
                    <FormControl className={reviewFormStyles.commentTextField}>
                        <CNTextField
                        fullWidth
                        name = "comment"
                        type="text"
                        placeholder="Your comment (optional)"
                        multiline
                        rows={20}
                        rowsMax={30}
                        inputChange={e => onChange(e)}
                        value={value ? value : ''}

                        />
                     
                    </FormControl>
                )}
                />
                </Row>
                <CNButton type="submit" buttonType="main" >Submit Review</CNButton>
            </form>
        </Container>
    )
}


