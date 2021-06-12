import React, { useState } from 'react';
import { CNModal } from '@Components/shared/CNModal/CNModal';
import { LoginForm } from '@Components/components/LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { ForgetPasswordForm } from '../ForgetPasswordForm/ForgetPasswordForm';

export const HomeModal = ({ selectedModal, setSelectedHomeModal, ...rest }) => {
  return (
    <CNModal {...rest}>
      {selectedModal === 'login' && (
        <LoginForm {...rest} setSelectedHomeModal={setSelectedHomeModal} />
      )} 
      {selectedModal === 'register' && (
        <RegisterForm
          {...rest}
          setSelectedHomeModal={setSelectedHomeModal}
        ></RegisterForm>
      )}
      {selectedModal === 'forgetPassword' && (<ForgetPasswordForm {...rest} setSelectedHomeModal={setSelectedHomeModal}/>)}
    </CNModal>
  );
};
