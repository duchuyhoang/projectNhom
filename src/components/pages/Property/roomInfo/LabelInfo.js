import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  padding: 5px 20px;
  display: inline-block;
  background-color: #f7f7f7;
  margin-right: 8px;
`;

function LabelInfo({ child }) {
  return <Box>{child}</Box>;
}

export default LabelInfo;
