import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CNButton } from '../CNButton/CNButton';
import { SVGIcon } from '../SvgIcon/Icon';

const move = keyframes`
    from {
        top: -30px;
        visibility: hidden;
        opacity: 0;
    }
    to{
        top: 30px;
        visibility: visible;
        opacity: 1;
    }
`;

const Container = styled.div`
  width: 400px;
  background-color: #ebebeb;
  padding: 30px;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  animation: ${move} linear 0.3s;
  > svg {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`;
const Messenger = styled.div`
  text-align: center;
`;
const Box = styled.div`
  text-align: center;
  margin-top: 30px;
  > button:first-child {
    margin-right: 30px;
  }
`;

function CNConfirm({
  showConfirm,
  setShowConfirm,
  messenger,
  onAccept,
  onCancel,
}) {
  const handleClose = (e) => {
    setShowConfirm(false);
  };
  return (
    showConfirm && (
      <Container>
        <SVGIcon name={'close'} onClick={handleClose} />
        <Messenger>{messenger}</Messenger>
        <Box>
          <CNButton
            buttonType={'main'}
            onClick={onAccept}
            children={'Accept'}
          />
          <CNButton
            buttonType={'main'}
            onClick={onCancel}
            children={'Cancel'}
          />
        </Box>
      </Container>
    )
  );
}

export default CNConfirm;
