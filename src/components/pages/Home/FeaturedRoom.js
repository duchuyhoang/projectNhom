import React from 'react';
import styled from 'styled-components';
import { HomeListRoom } from './HomeListRoom';

const Wrapper = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.75;
  color: #484848;
`;
const Container = styled.div`
  padding: 60px 0;
  font-family: ${(props) => props.theme.typography.fontFamily};
  width: 100%;
  text-align: center;
`;
const ContainerHeading = styled.h3`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: 30px;
  text-transform: capitalize;
  margin-top: 0;
  font-weight: 700;
`;
const ContainerDescription = styled.p`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: 16px;
  line-height: 25px;
`;
const ContainerSlider = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  height: auto;
  padding-bottom: 100px;
`;

function FeaturedRoom(props) {
  return (
    <Wrapper>
      <Container>
        <ContainerHeading>Featured Properties</ContainerHeading>
        <ContainerDescription>
          Handpicked properties by our team
        </ContainerDescription>
      </Container>
      <ContainerSlider>
        <HomeListRoom />
      </ContainerSlider>
    </Wrapper>
  );
}

export default FeaturedRoom;
