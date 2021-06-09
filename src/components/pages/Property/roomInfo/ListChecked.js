import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  li {
    display: inline-block;
  }
`;
const ListItem = styled.li`
  width: 33.33%;
  margin: 0 0 15px;
  div {
    display: inline-block;
  }
  svg {
    transform: translateY(2px);
    margin-right: 12px;
  }
`;
const ItemValue = styled.div``;

function ListChecked({ data }) {
  return (
    <List>
      {data.map((item, index) => (
        <ListItem key={index}>
          <SVGIcon name={'tick'} width={'14px'} fill={'#ff5a5f'} />
          <ItemValue>{item}</ItemValue>
        </ListItem>
      ))}
    </List>
  );
}

export default ListChecked;
