import React, { useEffect, useCallback, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { axiosApi } from '@Core/api/axiosApi';
import { FormControl, FormHelperText, makeStyles } from '@material-ui/core';
import useIsMobile from '@Core/hooks/useIsMobile';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { CNTextField } from '@Components/shared/CNTextField/CNTextField';
import { CNButton } from '@Components/shared/CNButton/CNButton';
import backgroundImage from '@Assets/images/bg.jpg';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const useForgetPasswordFormStyles = makeStyles((theme) => ({
  input: {
    marginBottom: 40,
    position: 'relative',
  },
  helperText: {
    color: theme.palette.primary.main,
    position: 'absolute',
    bottom: 0,
  },
}));

// Animation
const upToDown = keyframes`
    from{
        transform: translateY(-20%);
        opacity:0;
       
    }
    to{
        transform: translateY(0%);
        opacity: 1;
        
    }
`;
// styled components
const Container = styled.div`
  box-sizing: border-box;
  padding: ${(props) => (props.isMobile ? '0' : '20px')};
  background-color: ${(props) => props.theme.palette.background.secondary};
  border-radius: 6px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  display: flex;
  height: ${(props) => (props.isMobile ? '440px' : '600px')};
  will-change: transform opacity;
  max-width: 812px;
  width: 100%;
  > * {
    box-sizing: border-box;
  }
  animation: ${upToDown} ease-in-out 0.5s;
`;
const LeftContainer = styled.div`
  width: 50%;
  border-radius: 6px;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
  }
  display: ${(props) => (props.isMobile ? 'none' : 'block')};
`;
const RightContainer = styled.div`
  flex: 1;
  padding: 0 15px;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: #006c70;
  font-size: 20px;
  font-weight: bold;
  transition: 0.2s all;
`;
const TititleIcon = styled.a`
  cursor: pointer;
  &:hover {
    & > svg {
      fill: ${(props) => props.theme.palette.primary.main};
    }
  }
`;
const ContentRight = styled.div`
  margin-top: ${(props) => (props.isMobile ? '0' : '60px')};
`;
const AlertWarning = styled.div`
  padding: 15px;
  background-color: #fcf8e3;
  border: 1px solid #faebcc;
  color: #8a6d3b;
  margin-bottom: 24px;
`;
const MainTitle = styled.h3`
  text-align: center;
  font-size: 22px;
  color: ${(props) => props.theme.palette.text.primary};
`;
const LinkBackToLogin = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #8b91dd;
  font-size: 18px;
  position: absolute;
  bottom: 0;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;
const ErrorNotification = styled.p`

`
export const ForgetPasswordForm = ({
  showModal,
  setShowModal,
  setSelectedHomeModal,
}) => {
  const forgetPasswordFormStyles = useForgetPasswordFormStyles();
  const { isMobile } = useIsMobile();
  const keyPress = useCallback(
    (e) => {
      if (e.key === 'escape' && showModal) setShowModal(false);
    },
    [showModal]
  );
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);
  const defaultValues = {
    email: '',
  };
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your Email')
      .email('Email is not invalid'),
  });
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [isErrorSent,setIsErrorSent] = useState(false);
  const handleGetSubmitHandler = (values) => {
    console.log(values);
    const { email } = values;
    axiosApi
      .post('/forgotPassword/sendMail', { email })
      .then((value) => {
        console.log('đã gửi mail');
      })
      .catch((err) => {
        console.log('Lỗi');
        setIsErrorSent(true);
      })
    reset(defaultValues);
  };
  return (
    <Container isMobile={isMobile}>
      <LeftContainer isMobile={isMobile}>
        <img src={backgroundImage} />
      </LeftContainer>
      <RightContainer isMobile={isMobile}>
        <Title>
          Reset Password
          <TititleIcon onClick={() => setShowModal((prev) => !prev)}>
            <SVGIcon name="close" fill="#006c70" height="12px" width="12px" />
          </TititleIcon>
        </Title>
        <ContentRight isMobile={isMobile}>
          <AlertWarning>Enter an username or e-mail address.</AlertWarning>
          <MainTitle>Reset Password</MainTitle>
          <form onSubmit={handleSubmit(handleGetSubmitHandler)}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl required fullWidth>
                  <label htmlFor="input">E-mail</label>
                  <CNTextField
                    className={forgetPasswordFormStyles.input}
                    id="input"
                    fullWidth
                    type="email"
                    placeholder="Enter your E-mail"
                    error={!!formState.errors['usernameOrEmail']}
                    value={value ? value : ''}
                    inputChange={(e) => {
                      onChange(e);
                    }}
                  />
                  <FormHelperText
                    className={forgetPasswordFormStyles.helperText}
                  >
                    {formState.errors['email']?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
           {isErrorSent && <ErrorNotification>
                    Email is not existed in server
            </ErrorNotification>}
            <CNButton fullWidth type="submit" buttonType="main">
              Get New Password
            </CNButton>
            <CNButton
              fullWidth
              type="reset"
              buttonType="main"
              onClick={() => reset({ defaultValues })}
            >
              Cancel
            </CNButton>
          </form>
        </ContentRight>
        <LinkBackToLogin
          onClick={(e) => {
            e.preventDefault();
            setSelectedHomeModal('login');
          }}
        >
          Click to Login
        </LinkBackToLogin>
      </RightContainer>
    </Container>
  );
};
