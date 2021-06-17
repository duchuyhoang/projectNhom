import homeBackground from '@Assets/background/homeBg.jpg';
import { authSelectors } from '@Core/redux/auth';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SearchRoom } from '../SearchRoom/SearchRoom';

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
  const isLogin = useSelector(authSelectors.selectIsLogin);

  return (
    <>
      <Container>
        <SearchRoom needRedirect={isLogin} isLogin={isLogin} />
      </Container>
    </>
  );
};
