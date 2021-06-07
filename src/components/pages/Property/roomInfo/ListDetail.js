import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  li {
    display: inline-block;
  }
`;
const ListItem = styled.li`
  width: 50%;
  margin: 0 0 15px;
  div {
    display: inline-block;
  }
`;
const ItemText = styled.div`
  min-width: 125px;
`;
const ItemValue = styled.div`
  font-weight: 700;
`;

function ListDetail({ data }) {
  return (
    <List>
      {data.map((item) => (
        <ListItem>
          <ItemText>{item.text}:</ItemText>
          <ItemValue>{item.value}</ItemValue>
        </ListItem>
      ))}
    </List>
  );
}

export default ListDetail;
