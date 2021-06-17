import React, { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
`;
const ViewTop = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  top: -50px;
  color: #fff;
  > svg {
    fill: #fff;
  }
`;
const ViewImg = styled.div``;
const NumImg = styled.div`
  flex: 1 1 auto;
  font-size: 16px;
`;
const Img = styled.div`
  width: 100%;
  max-height: 800px;
  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
  }
`;

function ViewAllPhoto({ data, onClick }) {
  const [numImg, setNumImg] = useState(1);
  const settings = {
    accessibility: true,
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setNumImg(next + 1);
    },
  };

  return (
    <Container>
      <ViewTop>
        <NumImg>
          <span>
            {numImg}/{data.length}
          </span>
        </NumImg>
        <SVGIcon name="close" onClick={onClick} style={{ cursor: 'pointer' }} />
      </ViewTop>
      <ViewImg>
        <Slider {...settings}>
          {data.map((item) => {
            return (
              <Img key={item.imagesIds}>
                <img src={item.imagesLinks} />
              </Img>
            );
          })}
        </Slider>
      </ViewImg>
    </Container>
  );
}

export default ViewAllPhoto;
