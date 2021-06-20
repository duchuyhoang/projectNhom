import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { CNModal } from '@Components/shared/CNModal/CNModal';

const DeleteIcon = styled.div`
  position: absolute;
  padding: 5px;
  width: 10px;
  height: 10px;
  right: 0px;
  float: right;
  display: none;
  justify-content: center;
  align-items: center;
  top: 0;
  background: ${(props) => props.theme.palette.background.paper};
`;

const ImageWrapper = styled.div`
  height: 150px;
  cursor: pointer;
  width: 150px;
  margin-left: 10px;
  position: relative;
  &:hover ${DeleteIcon} {
    display: flex;
  }
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
`;

const BigImage = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 5px;
`;

export const CNPreviewImage = ({ src, handleClose = () => {} }) => {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      {open ? (
        <CNModal showModal={open} setShowModal={setIsOpen}> 
          <BigImage src={src} />
        </CNModal>
      ) : (
        <ImageWrapper 
        onClick={(e)=>{e.stopPropagation();
            setIsOpen(true)
        }}>
          <DeleteIcon
            onClick={(e) => {
              {
                e.stopPropagation();
                handleClose();
              }
            }}
          >
            <SVGIcon name="close" styles={{ fill: '#fff' }} />
          </DeleteIcon>
          <img src={src} />
        </ImageWrapper>
      )}
    </>
  );
};
