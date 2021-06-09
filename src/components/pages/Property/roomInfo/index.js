import { Footer } from '@Components/components/Footer/Footer';
import { CNModal } from '@Components/shared/CNModal/CNModal';
import CNProgressBar from '@Components/shared/CNProgressBar/CNProgressBar';
import CNStar from '@Components/shared/CNStar/CNStar';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import FormAddReview from './FormAddReview';
import LabelInfo from './LabelInfo';
import ListChecked from './ListChecked';
import ListDetail from './ListDetail';
import RoomInfoIcon from './RoomInfoIcon';
import RoomSlide from './RoomSlide';
import './styles.css';
import ViewAllPhoto from './ViewAllPhoto';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  margin-top: 116px;
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.75;
  color: #484848;
  background-color: #f7f7f7;
  box-sizing: border-box;
`;
const SlideWrapper = styled.div`
  position: relative;
`;
const Gallery = styled.div`
  position: absolute;
  width: 100%;
  bottom: 30px;
`;
const BoxView = styled.div`
  display: flex;
  align-items: center;
`;
const ViewPhoto = styled.div`
  display: flex;
  width: 170px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  :hover {
    color: #ff5a5f;
  }
  :hover > svg {
    fill: #ff5a5f;
  }
  > svg {
    margin-right: 12px;
    transform: translateY(-1px);
  }
`;
const RowIcon = styled.div`
  flex: 1 1 auto;
  display: flex;
`;
const Container = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
`;
const ContentWrapper = styled.div`
  width: calc(2 * 100% / 3);
`;
const BasicInfo = styled.div`
  background-color: #fff;
  margin-top: 60px;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  margin-bottom: 30px;
`;
const ContentTop = styled.div`
  padding: 30px 30px 20px 30px;
  display: flex;
  border-bottom: 1px solid #ebebeb;
`;
const TopLeft = styled.div`
  flex: 1 0 auto;
`;
const RoomName = styled.div`
  h1 {
    font-size: 30px;
    font-weight: 700;
  }
`;
const RoomAddress = styled.div`
  margin-top: 5px;
  display: inline-block;
  a {
    text-decoration: none;
    outline: none;
  }
`;
const TopRight = styled.div``;
const RoomPrice = styled.div`
  span {
    font-size: 30px;
    font-weight: 700;
  }
`;
const ContentOverView = styled.div`
  padding: 25px 30px 20px 30px;
  border-bottom: 1px solid #ebebeb;
`;
const SideBar = styled.div``;
const LabelWrapper = styled.div`
  margin-bottom: 25px;
`;
const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const Description = styled.div`
  p {
    margin-bottom: 32px;
  }
`;
const ContentDetail = styled.div`
  padding: 25px 30px 30px 30px;
`;
const WrapperInfo = styled.div`
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  padding: 30px;
  margin-bottom: 30px;
`;

const RightTitle = styled.div`
  display: flex;
  align-items: center;
`;
const ImgMap = styled.div`
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.4;
  }
`;
const Icon = styled.div`
  display: inline-block;
  margin-right: 6px;
  transform: translateY(2px);
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  h3 {
    flex: 1 0 auto;
  }
`;

const BoxItem = styled.div`
  :not(:last-child) {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #dee6ed;
  }
`;

function RoomInfo(props) {
  const classes = useStyles();
  const dataImg = [
    {
      image:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/04/5-960x600.jpg',
    },
    {
      image:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/04/11-960x600.jpg',
    },
    {
      image:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/04/6-960x600.jpg',
    },
    {
      image:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/04/5-960x600.jpg',
    },
    {
      image:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/04/4-1-960x600.jpg',
    },
    {
      image:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/04/4-1-960x600.jpg',
    },
    {
      image:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/04/4-1-960x600.jpg',
    },
    {
      image:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/04/4-1-960x600.jpg',
    },
    {
      image:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/04/4-1-960x600.jpg',
    },
  ];
  const listData = [
    {
      text: 'Tên',
      value: 'Penthouse',
    },
    {
      text: 'Sức chứa(người)',
      value: '3',
    },
    {
      text: 'Diện tích',
      value: '20\u33A1',
    },
    {
      text: 'Giá',
      value: '$7500',
    },
    {
      text: 'Tiền nước',
      value: '4.000đ',
    },
    {
      text: 'Tiền điện(kWh)',
      value: '4.000đ',
    },
  ];
  const listAmenities = [
    'Wifi',
    'Tủ lạnh',
    'Điều hòa',
    'Máy giặt',
    'Bếp',
    'Khép kín',
  ];
  const valuation = [
    {
      label: 'Medical',
      value: 90,
    },
    {
      label: 'Traffic',
      value: 80,
    },
    {
      label: 'Pollution',
      value: 50,
    },
  ];
  const listComment = [
    {
      img:
        'https://g5p6r6b9.stackpathcdn.com/homeo/wp-content/uploads/2020/02/5-150x150.jpg',
      name: 'Admin',
      starValue: 4.5,
      date: 'April 2, 2020',
      text:
        'Fully furnished. Elegantly appointed condominium unit situated on premier location. PS6. The wide entry hall leads to a large living room with dining area.',
    },
    {
      img: '',
      name: 'HoaNgo',
      starValue: 4,
      date: 'April 2, 2020',
      text:
        'The master suite is surrounded by handcrafted milkwork and features incredible walk-in closet and storage space.',
    },
  ];

  const handleSubmit = (values) => {
    console.log(values);
  };
  const [showModal, setShowModal] = useState(false);
  const handleShowPhoto = () => {
    setShowModal(!showModal);
  };
  return (
    <Wrapper className={classes.root}>
      <CNModal
        showModal={showModal}
        setShowModal={setShowModal}
        children={<ViewAllPhoto data={dataImg} onClick={handleShowPhoto} />}
      />
      <SlideWrapper>
        <RoomSlide data={dataImg} />
        <Gallery>
          <Container>
            <BoxView>
              <ViewPhoto onClick={handleShowPhoto}>
                <SVGIcon name={'camera'} />
                <span>View Photos</span>
              </ViewPhoto>
              <RowIcon>
                <div style={{ marginLeft: 'auto', display: 'flex' }}>
                  <RoomInfoIcon
                    selected={false}
                    icon={<SVGIcon name="compare" />}
                    style={{ marginRight: '12px' }}
                  />
                  <RoomInfoIcon
                    selected={false}
                    icon={<SVGIcon name="favourite" />}
                  />
                </div>
              </RowIcon>
            </BoxView>
          </Container>
        </Gallery>
      </SlideWrapper>
      <Container>
        <ContentWrapper>
          <BasicInfo>
            <ContentTop>
              <TopLeft>
                <RoomName>
                  <h1>{'Eaton Garth Penthouse'}</h1>
                </RoomName>
                <RoomAddress>
                  <a href="#">25-25 Broadway, Astoria</a>
                </RoomAddress>
              </TopLeft>
              <TopRight>
                <RoomPrice>
                  <span>$7500</span>
                </RoomPrice>
              </TopRight>
            </ContentTop>
            <ContentOverView>
              <LabelWrapper>
                <LabelInfo
                  child={<span style={{ color: '#FF5A5F' }}>Phòng trọ</span>}
                />
                <LabelInfo child={<span>{`Bed: 4`}</span>} />
                <LabelInfo child={<span>{`Baths: 1`}</span>} />
                <LabelInfo
                  child={
                    <span>
                      Diện tích: {`20`}
                      {'\u33A1'}
                    </span>
                  }
                />
              </LabelWrapper>
              <Title>Over view</Title>
              <Description>
                <p>
                  Evans Tower very high demand corner junior one bedroom plus a
                  large balcony boasting full open NYC views. You need to see
                  the views to believe them. Mint condition with new hardwood
                  floors. Lots of closets plus washer and dryer.
                </p>
                <p>
                  Fully furnished. Elegantly appointed condominium unit situated
                  on premier location. PS6. The wide entry hall leads to a large
                  living room with dining area. This expansive 2 bedroom and 2
                  renovated marble bathroom apartment has great windows. Despite
                  the interior views, the apartments Southern and Eastern
                  exposures allow for lovely natural light to fill every room.
                  The master suite is surrounded by handcrafted milkwork and
                  features incredible walk-in closet and storage space.
                </p>
                <p>
                  The second bedroom is a corner room with double windows. The
                  kitchen has fabulous space, new appliances, and a laundry
                  area. Other features include rich herringbone floors, crown
                  moldings and coffered ceilings throughout the apartment. 1049
                  5th Avenue is a classic pre-war building located across from
                  Central Park, the reservoir and The Metropolitan Museum.
                  Elegant lobby and 24 hours doorman. This is a pet-friendly
                  building.
                </p>
              </Description>
            </ContentOverView>
            <ContentDetail>
              <Title>Detail</Title>
              <ListDetail data={listData} />
            </ContentDetail>
          </BasicInfo>
          <WrapperInfo>
            <Title>Amenities</Title>
            <ListChecked data={listAmenities} />
          </WrapperInfo>
          <WrapperInfo>
            <TitleWrapper>
              <Title>Location</Title>
              <RightTitle>
                <Icon>
                  <SVGIcon name="location" />
                </Icon>
                <RoomAddress>
                  <a
                    href="https://www.google.com/maps/place/H%E1%BB%8Dc+Vi%E1%BB%87n+C%C3%B4ng+Ngh%E1%BB%87+B%C6%B0u+Ch%C3%ADnh+Vi%E1%BB%85n+Th%C3%B4ng/@21.0466287,105.7914947,17.75z/data=!4m5!3m4!1s0x3135ab306caa83a7:0xbfe4b316823e38f7!8m2!3d21.0466267!4d105.7921393?hl=vi-VN"
                    target="_blank"
                  >
                    {`25-25 Broadway, Astoria`}
                  </a>
                </RoomAddress>
              </RightTitle>
            </TitleWrapper>
            <ImgMap>
              <img src="../../../../assets/images/mapPTIT.JPG" />
            </ImgMap>
          </WrapperInfo>
          <WrapperInfo>
            <Title>Amenities</Title>
            {valuation.map((item, index) => (
              <div className={'mgb'} key={index}>
                <CNProgressBar label={item.label} value={item.value} />
              </div>
            ))}
          </WrapperInfo>
          <WrapperInfo>
            <TitleWrapper>
              <Title>{'2'} Comment</Title>
              <RightTitle>
                <Icon>
                  <CNStar value={2.5} readOnly size="small" />
                </Icon>
                <span>(2 comment)</span>
              </RightTitle>
            </TitleWrapper>
            {listComment.map((item, index) => (
              <BoxItem key={index}>
                <CommentItem data={item} />
              </BoxItem>
            ))}
          </WrapperInfo>
          <WrapperInfo>
            <Title>Add a review</Title>

            <FormAddReview onSubmit={handleSubmit} />
          </WrapperInfo>
        </ContentWrapper>
        <SideBar></SideBar>
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default RoomInfo;
