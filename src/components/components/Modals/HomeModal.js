import React, { lazy, useState, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom'
import { CNModal } from '@Components/shared/CNModal/CNModal';

import { CNLoading } from '@Components/shared/CNLoading/CNLoading';
import styled from 'styled-components';
const LoginForm = lazy(() => import('@Components/components/LoginForm/LoginForm'))
const RegisterForm = lazy(() => import('@Components/components/RegisterForm/RegisterForm'))
const ForgetPasswordForm = lazy(() => import('@Components/components/ForgetPasswordForm/ForgetPasswordForm'))
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.7);
  z-index:2000;
`
const HomeModal = () => {
  return (
    <>
      <Suspense fallback={<CNLoading />}>
        <Switch>
          <Route path='/login'>
            <Container><LoginForm /></Container>
          </Route>
          <Route path='/signup'>
            <Container>
              <RegisterForm />
            </Container>

          </Route>
          <Route path='/reset-password'>
            <Container>

              <ForgetPasswordForm />
            </Container>

          </Route>
        </Switch>
      </Suspense>
    </>
  );
};
export default HomeModal