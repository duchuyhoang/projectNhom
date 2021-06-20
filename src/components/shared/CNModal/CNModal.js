import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { uuid } from '@Ultis/uuid';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const AlignCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  ${AlignCenter};
  z-index: 2001;
  margin: auto;
  top: 0;
  animation: ${fadeIn} linear 0.1s;
`;

export const CNModal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal &&
        ReactDOM.createPortal(
          <Background ref={modalRef} onClick={closeModal}>
            <SVGIcon
              name="close"
              style={{
                fill: '#fff',
                position: 'absolute',
                right: 20,
                top: 20,
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowModal(false);
              }}
            />
            {children}
          </Background>,

          document.getElementById('modal')
        )}
    </>
  );
};
