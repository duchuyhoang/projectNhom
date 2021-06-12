import React from 'react';
import styled from 'styled-components';
import homeBackground from '@Assets/background/homeBg.jpg';
import { SearchRoom } from '../SearchRoom/SearchRoom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Container = styled.section`
  background-image: url(${homeBackground});
  height: 105vh;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FindHomeComponent = (props) => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <SearchRoom />
      </Container>
    </>
  );
};
