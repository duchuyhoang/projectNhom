import React,{useState} from 'react'
import {FormControl, FormHelperText, makeStyles} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styled from 'styled-components';
import { CNTextField} from '@Components/shared/CNTextField/CNTextField';
import CNStar from '@Components/shared/CNStar/CNStar'
import {CNButton} from '@Components/shared/CNButton/CNButton';

const Container = styled.div`
    font-family:${(props) => props.theme.typography.fontFamily};

`
const Title = styled.h3`
`
const RattingWrapper = styled.div``
const Row = styled.div`
display: flex;
justify-content: space-between;
`
export const ReviewForm = () => {
    const [starRating, setStarRating] = useState(0);
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
        console.log(values)
        console.log(starRating)
    }
    return (
        <Container>
            <Title>Add a Review</Title>
            <RattingWrapper>
                <CNStar value={starRating} size='large' onChange={starRatingHandler}/>
            </RattingWrapper>
            <form onSubmit={handleSubmit(addReviewHandler)}>

                <Controller
                name = "name"
                control={control}
                render = {({ field: { onChange, value}}) => (
                    <FormControl>
                        <CNTextField
                        name = "name"
                        type="text"
                        placeholder="Your name"
                        error={!!formState.errors['name']}
                        inputChange={e => onChange(e)}
                        value={value ? value : ''}

                        />
                         <FormHelperText >
                      {formState.errors['name']?.message}
                    </FormHelperText>
                    </FormControl>
                )}
                />
                <Controller
                name = "email"
                control={control}
                render = {({ field: { onChange, value}}) => (
                    <FormControl>
                        <CNTextField
                        name = "email"
                        type="email"
                        placeholder="Your email"
                        error={!!formState.errors['email']}
                        inputChange={e => onChange(e)}
                        value={value ? value : ''}

                        />
                         <FormHelperText >
                      {formState.errors['email']?.message}
                    </FormHelperText>
                    </FormControl>
                )}
                />
                <Controller
                name = "comment"
                control={control}
                render = {({ field: { onChange, value}}) => (
                    <FormControl>
                        <CNTextField
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
                <CNButton type="submit" buttonType="main" >Submit Review</CNButton>
            </form>
        </Container>
    )
}


