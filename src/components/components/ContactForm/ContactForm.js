import React from 'react'
import { FormControl, FormHelperText, makeStyles } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { CNTextField } from '@Components/shared/CNTextField/CNTextField';
import { CNButton } from '@Components/shared/CNButton/CNButton';
const useContactFormStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
        "& > div": {
            width: "100%",
            marginBottom: 30
        }
    },
    formControl: {
        position: "relative"
    },

    helperText: {
        position: "absolute",
        bottom: -20,
        color: theme.palette.primary.main,
        fontSize: 14
    }

}))
const Container = styled.div`
    background-color: ${props => props.theme.palette.background.secondary};
    font-family: ${(props) => props.theme.typography.fontFamily};
    padding: 30px;
    margin-bottom: 30px;
`
const Title = styled.h3`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
`
export const ContactForm = () => {
    const contactFormStyles = useContactFormStyles();
    const defaultValues = {
        name: '',
        email: '',
        phone: '',
        message: ''
    }
    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên của bạn!'),
        email: yup.string().required('Vui lòng nhập email của bạn').email('Email không hợp lệ'),
        phone: yup.string().required('Vui lòng nhập số điện thoại của bạn'),
        message: yup.string().required('Vui lòng nhập tin nhắn')
    })
    const { control, handleSubmit, formState, reset } = useForm({
        mode: 'onSubmit',
        defaultValues,
        resolver: yupResolver(schema)
    })
    const sendMessageHandler = (values) => {
        console.log(values)
    }
    return (
        <Container>
            <Title>Contact Tom Wilson</Title>
            <form className=
                {contactFormStyles.form} onSubmit={handleSubmit(sendMessageHandler)}>
                <Controller 
                    name='name'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormControl 
                        className={contactFormStyles.formControl} >
                            <CNTextField
                                className={contactFormStyles.textField}
                                fullWidth
                                placeholder="Name"
                                type="text"
                                error={formState.errors['name']}
                                value={value ? value : ''}
                                inputChange={e => {
                                    onChange(e);
                                }}
                            />
                            <FormHelperText className={contactFormStyles.helperText}>
                                {formState.errors['name']?.message}
                            </FormHelperText>
                        </FormControl>
                    )
                    }
                />
                <Controller
                    name='email'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormControl  className={contactFormStyles.formControl}>
                            <CNTextField
                                fullWidth
                                placeholder="Email"
                                type="email"
                                error={formState.errors['email']}
                                value={value ? value : ''}
                                inputChange={e => {
                                    onChange(e);
                                }}
                            />
                            <FormHelperText className={contactFormStyles.helperText}>
                                {formState.errors['email']?.message}
                            </FormHelperText>
                        </FormControl>
                    )
                    }
                />
                <Controller
                    name='phone'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormControl  className={contactFormStyles.formControl}>
                            <CNTextField
                                fullWidth
                                placeholder="Phone"
                                type="text"
                                error={!!formState.errors['phone']}
                                value={value ? value : ''}
                                inputChange={e => {
                                    onChange(e);
                                }}
                            />
                            <FormHelperText className={contactFormStyles.helperText}>
                                {formState.errors['phone']?.message}
                            </FormHelperText>
                        </FormControl>
                    )
                    }
                />
                <Controller
                    name='message'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FormControl  className={contactFormStyles.formControl}>
                            <CNTextField
                                fullWidth
                                multiline
                                rows={8}
                                rowsMax={10}
                                placeholder="Your message"
                                value={value ? value : ''}
                                error={!!formState.errors['message']}
                                inputChange={e => {
                                    onChange(e);
                                }}
                            />
                            <FormHelperText className={contactFormStyles.helperText}>
                                {formState.errors['message']?.message}
                            </FormHelperText>
                        </FormControl>
                    )
                    }
                />
                <CNButton type="submit" fullWidth>
                    Send Message
                </CNButton>
            </form>
        </Container>
    )
}

