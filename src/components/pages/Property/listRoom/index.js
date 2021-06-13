import React from 'react';
import { Footer } from '@Components/components/Footer/Footer';
import RoomCard from '@Components/components/RoomCard/RoomCard';
import { SearchRoom } from '@Components/components/SearchRoom/SearchRoom';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { roomSelectors } from '@Core/redux/room';
import { makeStyles } from '@material-ui/core';
import { CNLoading } from '@Components/shared/CNLoading/CNLoading';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { usePagination } from '@Core/hooks/usePagination';
import ListGridIcon from './ListGridIcon';
import { CNPagination } from '@Components/shared/CNPagination/CNPagination';

const useStyles = makeStyles((theme) => ({
  icon: {
    '& > svg': {
      width: '21px',
      height: '21px',
    },
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'calc(50% - 15px) calc(50% - 15px)',
    gridGap: '30px',
    '& > div': {
      width: '100%',
    },
  },
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
const Container = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
`;
const ListTop = styled.div`
  display: flex;
  align-items: center;
  padding: 50px 0;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
`;
const GirdIcon = styled.div`
  flex: 1 1 auto;
`;
const GirdFlex = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-right: -10px;
  > * {
    margin-right: 10px;
  }
`;
const ListContent = styled.div`
  margin-bottom: 60px;
`;
const Row = styled.div`
  display: flex;
`;
const LeftBar = styled.div`
  width: calc(100% / 3);
  flex-shrink: 0;
  padding-right: 15px;
  box-sizing: border-box;
`;
const RightBar = styled.div`
  box-sizing: border-box;
  max-width: calc(100% * 2 / 3);
  flex: 1 1 100%;
  padding-left: 15px;
`;
const OrderWrapper = styled.div`
  padding: 15px 30px;
  margin-bottom: 30px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  display: flex;
`;
const ResultCount = styled.div`
  flex: 1 1 auto;
`;
const Order = styled.div`
  flex-shrink: 0;
`;
const ListRoom = styled.div`
  width: 100%;
  > div {
    /* width: calc(50% - 20px); */
  }
`;

function listRoom(props) {
  const classes = useStyles();
  const listRoom = useSelector(roomSelectors.searchRoomSelectorAll) || [];
  const totalPages = useSelector(roomSelectors.searchRoomTotalPages);
  console.log(useSelector(state=>state));
  const searchRoomLoading = useSelector(roomSelectors.searchRoomLoadingStatus);
console.log(searchRoomLoading);
  const {
    pageIndex,
    setPageIndex,
    itemPerPage,
    setItemPerPage,
  } = usePagination(false, 1, 2);

  return (
    <>
      {/* {searchRoomLoading !== 'idle' && searchRoomLoading !== 'pending' ? ( */}
        <Wrapper>
          <Container>
            <ListTop>
              <Title>Properties</Title>
              <GirdIcon>
                <GirdFlex>
                  <ListGridIcon
                    icon={<SVGIcon name="gridMenu" />}
                    className={classes.icon}
                    selected={true}
                  ></ListGridIcon>
                  <ListGridIcon
                    icon={<SVGIcon name="gridList" />}
                    className={classes.icon}
                  ></ListGridIcon>
                </GirdFlex>
              </GirdIcon>
            </ListTop>
            <ListContent>
              <Row>
                <LeftBar>
                  <SearchRoom
                    type="properties"
                    items_per_page={itemPerPage}
                    page_index={pageIndex}
                    setPageIndex={(number) => {
                      setPageIndex(number);
                    }}
                  />
                </LeftBar>
                <RightBar>
                  <OrderWrapper>
                    <ResultCount>Showing 1 – 9 of 14 results</ResultCount>
                    <Order>
                      <span>Sort By: </span>
                    </Order>
                  </OrderWrapper>
                  <ListRoom>
                    <div className={classes.row}>
                      {listRoom.map((room, index) => {
                        return (
                          <RoomCard
                            key={index}
                            name={room.name}
                            city={room.cityName}
                            district={room.districtName}
                            ward={room.wardName}
                            list_images={room?.images || []}
                            price={
                              room.water_bill + room.price + room.utility_bill
                            }
                            capacity={room.capacity}
                            acreage={room.acreage}
                            user_name={room.user_name}
                            user_avatar={room.user_avatar}
                            list_utilities={room.utilities}
                            createTime={room.createTime}
                          />
                        );
                      })}
                    </div>
                  </ListRoom>
                </RightBar>
              </Row>
            </ListContent>
            <CNPagination
              total={totalPages == 0 ? 1 : totalPages}
              page={pageIndex}
              setPaginationIndex={(page) => {
                setPageIndex(page);
              }}
            />
          </Container>
          <Footer />
        </Wrapper>
      {/* ) : (
        <CNLoading />
      )} */}
    </>
  );
}

export default listRoom;
