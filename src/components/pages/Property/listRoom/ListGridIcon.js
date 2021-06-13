import React, { useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #ebebeb;
  background-color: ${(props) => (props.active ? '#e3e3e3' : '#fff')};
  position: relative;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #e3e3e3;
  }
`;

function ListGridIcon({ selected, icon, ...rest }) {
  const [isActive, setIsActive] = useState(selected);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <Box onClick={handleClick} active={isActive} {...rest}>
      {icon}
    </Box>
  );
}

export default ListGridIcon;
