import { Footer } from '@Components/components/Footer/Footer';
import { SearchRoom } from '@Components/components/SearchRoom/SearchRoom';
import { CNModal } from '@Components/shared/CNModal/CNModal';
import CNProgressBar from '@Components/shared/CNProgressBar/CNProgressBar';
import CNStar from '@Components/shared/CNStar/CNStar';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { makeStyles } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import FormAddReview from './FormAddReview';
import LabelInfo from './LabelInfo';
import ListChecked from './ListChecked';
import ListDetail from './ListDetail';
import RoomInfoIcon from './RoomInfoIcon';
import RoomSlide from './RoomSlide';
import { PageNotFoundComponent } from "@Components/components/PageNotFoundComponent/PageNotFoundComponent";
import { useCurrentRoom } from "./useCurrentRoom";
import { CNLoading } from '@Components/shared/CNLoading/CNLoading';
import { Map } from "@Components/components/Map/Map";
import './styles.css';
import { useParams, useHistory } from 'react-router-dom';


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
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentWrapper = styled.div`
  width: calc(2 * 100% / 3 + 20px);
  padding: 0 15px;
  box-sizing: border-box;
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
const SideBar = styled.div`
  width: calc(100% / 3);
  padding: 0 15px;
  box-sizing: border-box;
  margin: 60px 0 30px;
`;
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
  const { name_router } = useParams();
  const [selectLocation, setSelectLocation] = useState({ latitude: null, longtitude: null })

  const [showModal, setShowModal] = useState(false);
  let history = useHistory();
  const { loading, currentRoom, currentRoomError } = useCurrentRoom(name_router);
  if (!name_router) {
    history.push("/home")
  }

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


  const handleSubmit = useCallback((values) => {
    console.log(values);
  }, [])

  const handleShowPhoto = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal])

  return (
    <>
      {loading != "idle" && loading != "pending" ?

        (currentRoom !== null && loading == "fulfilled" ?
          <Wrapper className={classes.root}>
            <CNModal
              showModal={showModal}
              setShowModal={setShowModal}
            >
              <ViewAllPhoto data={currentRoom.images} onClick={handleShowPhoto} />
            </CNModal>

            <SlideWrapper>
              <RoomSlide data={currentRoom.images} ></RoomSlide>
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
              <Flex>
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
                              Số nhà: {currentRoom.house_number}
                            </span>
                          }
                        />
                      </LabelWrapper>
                      <Title>Over view</Title>
                      <Description>
                        <p>{currentRoom.overview}</p>
                      </Description>
                    </ContentOverView>
                    <ContentDetail>
                      <Title>Detail</Title>
                      <ListDetail data={{
                        price: currentRoom.price,
                        name: currentRoom.name,
                        capacity: currentRoom.capacity,
                        water_bill: currentRoom.water_bill,
                        utility_bill: currentRoom.utility_bill,
                        acreage: currentRoom.acreage,
                      }} />
                    </ContentDetail>
                  </BasicInfo>
                  <WrapperInfo>
                    <Title>Amenities</Title>
                    <ListChecked data={currentRoom.utilities} />
                  </WrapperInfo>
                  <WrapperInfo>
                    <TitleWrapper>
                      <Title>Location</Title>
                      <RightTitle>
                        <Icon>
                          <SVGIcon name="location" />
                        </Icon>
                        <RoomAddress>
                          <Map defaultTarget={{ latitude: currentRoom.latitude || 21.046816934751238, longtitude: currentRoom.longtitude || 105.79207492501563 }}
                            isRoute={true}
                            currentTarget={selectLocation}
                            setCurrentTarget={setSelectLocation} />
                        
                        </RoomAddress>
                      </RightTitle>
                    </TitleWrapper>
                    <ImgMap>
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
                <SideBar>
                  <SearchRoom type="properties" />
                </SideBar>
              </Flex>
            </Container>
            <Footer />
          </Wrapper>

          :

          (loading == "rejected" && <PageNotFoundComponent />))


        : <CNLoading />}


    </>
  );
}

export default RoomInfo;
