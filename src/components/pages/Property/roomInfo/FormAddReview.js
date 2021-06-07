import { CNButton } from '@Components/shared/CNButton/CNButton';
import CNStar from '@Components/shared/CNStar/CNStar';
import { CNTextField } from '@Components/shared/CNTextField/CNTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormHelperText,
  makeStyles,
  TextareaAutosize,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  textArial: {
    fontFamily: 'inherit',
    color: '#484848',
    fontSize: '14px',
    padding: '12px 20px',
    border: '1px solid #d8d8d8',
    borderRadius: '6px',
    outline: 'none',
    '&::placeholder': {
      fontWeight: '400',
      opacity: '1',
    },
  },
  buttonStyles: {
    fontFamily: 'inherit',
    fontWeight: '700',
    fontSize: '16px',
    padding: '11px 40px',
    textTransform: 'capitalize',
    marginTop: '25px',
  },
  helperTextStyles: {
    color: 'red',
    position: 'absolute',
    bottom: '-18px',
  },
}));

const useInputStyles = makeStyles((theme) => ({
  input: {
    color: '#484848',
    fontSize: '14px',
    padding: '12px 20px',
    border: '1px solid #d8d8d8',
    borderRadius: '6px',
    width: '100%',
    fontFamily: 'inherit',
    '&::placeholder': {
      color: 'black',
      fontWeight: '400',
      opacity: '1',
    },
  },
}));

const Row = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  > div {
    width: calc(50% - 15px);
  }
`;

function FormAddReview({ onSubmit }) {
  const classes = useStyles();
  const inputStyles = useInputStyles();
  const schema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .required('Please enter your email')
      .email('Email is not valid'),
  });
  const { control, formState, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      overview: '',
    },
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const [starValue, setStarValue] = useState(5);
  const onStarChange = (values) => {
    setStarValue(values.target.value);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <CNStar value={starValue} onChange={onStarChange} />

      <Row>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <FormControl fullWidth>
              <CNTextField
                fullWidth
                type="text"
                name={name}
                placeholder="Your name"
                error={!!formState.errors['name']}
                value={value ? value : ''}
                classes={inputStyles}
                inputChange={(e) => {
                  onChange(e);
                }}
              />
              <FormHelperText className={classes.helperTextStyles}>
                {formState.errors['name']?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <FormControl fullWidth>
              <CNTextField
                fullWidth
                type="text"
                name={name}
                placeholder="your@mail.com"
                error={!!formState.errors['email']}
                value={value ? value : ''}
                classes={inputStyles}
                inputChange={(e) => {
                  onChange(e);
                }}
              />
              <FormHelperText className={classes.helperTextStyles}>
                {formState.errors['email']?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
      </Row>
      <Controller
        name="overview"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <FormControl fullWidth>
            <TextareaAutosize
              placeholder={'Write comment'}
              rowsMin={8}
              name={name}
              rowsMax={10}
              value={value ? value : ''}
              className={classes.textArial}
              onChange={onChange}
            />
          </FormControl>
        )}
      />
      <CNButton
        buttonType="main"
        type="submit"
        className={classes.buttonStyles}
      >
        <span>Submit Review</span>
      </CNButton>
    </form>
  );
}

export default FormAddReview;
