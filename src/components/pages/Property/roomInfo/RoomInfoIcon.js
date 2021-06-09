import React, { useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#ff5a5f' : '#fff')};
  > svg {
    fill: ${(props) => (props.active ? '#fff' : '#000')};
  }
  position: relative;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #ff5a5f;
    > svg {
      fill: #fff;
    }
  }
`;

function RoomInfoIcon({ selected, icon, ...rest }) {
  const [isActive, setIsActive] = useState(selected);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <Box
      onClick={handleClick}
      active={isActive}
      data-original-title="Add Favorite"
      {...rest}
    >
      {icon}
    </Box>
  );
}

export default RoomInfoIcon;
