import React, { useState } from 'react';
import { CNModal } from '@Components/shared/CNModal/CNModal';
import { LoginForm } from '@Components/components/LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { ForgetPasswordForm } from '../ForgetPasswordForm/ForgetPasswordForm';
import { CNSnackBar } from '@Components/shared/CNSnackBar/CNSnackBar';

export const HomeModal = ({ selectedModal, setSelectedHomeModal, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <CNSnackBar severity="success" isOpen={isOpen} onClose={handleClose}>
        Login thành công. Xin chào 🎉
      </CNSnackBar>
      <CNModal {...rest}>
        {selectedModal === 'login' && (
          <LoginForm
            {...rest}
            setSelectedHomeModal={setSelectedHomeModal}
            setShowSnackBar={handleOpen}
          />
        )}
        {selectedModal === 'register' && (
          <RegisterForm
            {...rest}
            setSelectedHomeModal={setSelectedHomeModal}
          ></RegisterForm>
        )}
        {selectedModal === 'forgetPassword' && (
          <ForgetPasswordForm
            {...rest}
            setSelectedHomeModal={setSelectedHomeModal}
          />
        )}
      </CNModal>
    </>
  );
};
