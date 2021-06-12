import React from 'react';
import styled from 'styled-components';
import { uuid } from '@Ultis/uuid';
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
      <ListItem key={uuid()}>
        <ItemText>Tên phòng:</ItemText>
        <ItemValue>{data.name}</ItemValue>
      </ListItem>

      <ListItem key={uuid()}>
        <ItemText>Sức chứa:</ItemText>
        <ItemValue>{data.capacity}</ItemValue>
      </ListItem>
      
      <ListItem key={uuid()}>
        <ItemText>Diện tích:</ItemText>
        <ItemValue>{data.acreage}</ItemValue>
      </ListItem>

      <ListItem key={uuid()}>
        <ItemText>Giá:</ItemText>
        <ItemValue>{data.price}</ItemValue>
      </ListItem>

      <ListItem key={uuid()}>
        <ItemText>Tiền nước:</ItemText>
        <ItemValue>{data.water_bill}</ItemValue>
      </ListItem>

      <ListItem key={uuid()}>
        <ItemText>Tiền điện(kWh):</ItemText>
        <ItemValue>{data.utility_bill}</ItemValue>
      </ListItem>
    </List>
  );
}

export default ListDetail;
