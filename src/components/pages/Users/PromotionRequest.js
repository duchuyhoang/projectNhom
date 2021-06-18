import React, { useState, useEffect, useCallback } from 'react';
import {
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import noImage from '@Assets/background/noImage.jpg';
import styled from 'styled-components';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { CNButton } from '@Components/shared/CNButton/CNButton';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { roomSelectors, roomActions } from '@Core/redux/room';
import { CNTextField } from '@Components/shared/CNTextField/CNTextField';
import { usePagination } from '@Core/hooks/usePagination';
import { CNAvatar } from '@Components/shared/CNAvatar/CNAvatar';
import { Link } from 'react-router-dom';
import CNConfirm from '@Components/shared/CNConfirm/CNConfirm';
import {CNPagination} from '@Components/shared/CNPagination/CNPagination';
const usePromotionRequestStyles = makeStyles((theme) => ({
  mainForm: {
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    position: 'relative',
  },
  tableContainer: {
    backgroundColor: theme.palette.background.secondary,
  },
  actions: {
    '& > button': {
      display: 'block',
    },
  },
  tablehead: {
    backgroundColor: '#24334A',
  },
  tableCell: {
    fontWeight: 700,
    fontSize: 18,
  },
  declineButton: {
    backgroundColor: '#24334A',
    transition: '.3s all',
    '&:hover': {
      backgroundColor: theme.palette.background.secondary,
    },
  },
  buttonSearch: {
    marginLeft: 20,
  },
  helperText: {
    color: theme.palette.primary.main,
    position: 'absolute',
    bottom: -20,
  },
}));
// styled components
const Wrapper = styled.div`
  background-color: #f7f7f7;
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 100vh;
`;
const Container = styled.div`
  padding-top: 100px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  > * {
    box-sizing: border-box;
  }
  background-color: #f7f7f7;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const Title = styled.h3`
  text-transform: Uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: bold;
  font-size: 24px;
`;
// RoomInfoMationComponent
// Styled for RoomInformation
const ContainerRoomInfo = styled.div`
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.typography.fontFamily};
`;
const LeftContainerRoomInfo = styled.div`
  flex: 1;
  width: 200px;
  margin-right: 10px;
  & > img {
    width: 100%;
    height: 200px;
    border-radius: 6px;
  }
`;
const RightContainerRoomInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;
const RoomName = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  font-weight: 700;
  margin-bottom: 4px;
`;
const RoomInfoItem = styled.p`
  margin-bottom: 4px;
  font-size: 16px;
`;
const RoomAddres = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 16px;
  & > svg {
    margin-right: 5px;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;

  & > img {
    height: 40px;
    width: 40px;
    border-radius: 100%;
    margin-right: 10px;
  }
  margin-bottom: 4px;
`;
const RoomInfomation = ({ roomData }) => {
  return (
    <ContainerRoomInfo>
      <LeftContainerRoomInfo>
        <img src={roomData.image || noImage} />
      </LeftContainerRoomInfo>
      <RightContainerRoomInfo>
        <RoomName to={`/property/${roomData?.name_router}`}>
          {roomData?.name}
        </RoomName>
        <RoomInfoItem>
          Area :{' '}
          <strong>
            {roomData?.acreage} m<sup style={{ fontSize: 10 }}>2</sup>
          </strong>
        </RoomInfoItem>
        <RoomInfoItem>
          Capacity: <strong>{roomData?.capacity} people</strong>
        </RoomInfoItem>
        <RoomInfoItem>
          Price:{' '}
          <strong>
            {new Intl.NumberFormat('ve-VE', {
              style: 'currency',
              currency: 'VND',
            }).format(roomData?.price)}
          </strong>
        </RoomInfoItem>
        <RoomAddres>
          <SVGIcon name="location" />
          <strong>
            {roomData?.wardName}
            {', '}
            {roomData?.districtName}
            {', '}
            {roomData?.cityName}
          </strong>
        </RoomAddres>
        <UserInfo>
          <CNAvatar type="small" src={roomData?.user_avatar} />
          <h3 style={{ marginLeft: 10 }}>{roomData?.user_name}</h3>
        </UserInfo>
        <RoomInfoItem>
          Phone : <strong>{roomData?.user_phone}</strong>
        </RoomInfoItem>
      </RightContainerRoomInfo>
    </ContainerRoomInfo>
  );
};

export const PromotionRequest = ({roomData}) => {
  // const listRoomRequest = useSelector(roomSelectors.pendingRoomSelectAll) || [];
  // const dispatch = useDispatch();
  // const [showConfirm, setShowConfirm] = useState(false);
  // const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  // const [selectedRoomId, setSelectedRoomId] = useState(-1);

  // useEffect(() => {
  //   dispatch(roomActions.getPendingRoom());
  // }, []);

  // const openConfirm = useCallback((id) => {
  //   return () => {
  //     setShowConfirm(true);
  //     setSelectedRoomId(id);
  //   };
  // }, []);

  // const openConfirmDelete = useCallback((id) => {
  //   return () => {
  //     setShowConfirmDelete(true);
  //     setSelectedRoomId(id);
  //   };
  // });

  const {
    pageIndex,
    setPageIndex,
    itemPerPage,
    setItemPerPage,
  } = usePagination(true, 1, 5);
  const [paginationState,setPaginationState]=useState({
        
    total: Math.ceil(roomData.length/itemPerPage),
    currentValue: 1

})
  const promotionRequestStyles = usePromotionRequestStyles();
  const defaultValues = {
    name: '',
  };
  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập từ khóa'),
  });
  const { handleSubmit, control, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const searchHandler = (values) => {
    console.log(values);
  };
  return (
    <Wrapper>
      {/* <CNConfirm
        showConfirm={showConfirm}
        messenger="Bạn chắc chắn thêm chứ?"
        onAccept={() => {
          if (selectedRoomId !== -1) {
            dispatch(
              roomActions.acceptPendingRoom({ id_room: selectedRoomId })
            );
            dispatch(
              roomActions.clearNotPendingRoom({ id_room: selectedRoomId })
            );
            setSelectedRoomId(-1);
            setShowConfirm(false);
          }
        }}
        onCancel={() => {
          setSelectedRoomId(-1);
          setShowConfirm(false);
        }}
      />

      <CNConfirm
        showConfirm={showConfirmDelete}
        messenger="Bạn chắc chắn xóa chứ?"
        onAccept={() => {
          if (selectedRoomId !== -1) {
            dispatch(
              roomActions.rejectPendingRoom({ id_room: selectedRoomId })
            );
            dispatch(
              roomActions.clearNotPendingRoom({ id_room: selectedRoomId })
            );
            setSelectedRoomId(-1);
            setShowConfirmDelete(false);
          }
        }}
        onCancel={() => {
          setSelectedRoomId(-1);
          setShowConfirmDelete(false);
        }}
      /> */}

      <Container>
        <Header>
          <Title>List Room Request</Title>
          <form
            className={promotionRequestStyles.mainForm}
            onSubmit={handleSubmit(searchHandler)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl className={promotionRequestStyles.formControl}>
                  <CNTextField
                    placeholder="Enter your keyword"
                    value={value ? value : ''}
                    error={!!formState.errors['name']}
                    inputChange={(e) => {
                      onChange(e);
                    }}
                  />
                  <FormHelperText className={promotionRequestStyles.helperText}>
                    {formState.errors['name']?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <CNButton
              className={promotionRequestStyles.buttonSearch}
              type="submit"
              buttonType="main"
            >
              Search
            </CNButton>
          </form>
        </Header>
        {roomData.length > 0 ? (
          <TableContainer
            className={promotionRequestStyles.tableContainer}
            component={Paper}
          >
            <Table>
              <TableHead>
                <TableRow className={promotionRequestStyles.tableHead}>
                  {/* <TableCell
                    className={promotionRequestStyles.tableCell}
                    align="center"
                  >
                    STT
                  </TableCell> */}
                  <TableCell
                    className={promotionRequestStyles.tableCell}
                    align="center"
                  >
                    Room Infomation
                  </TableCell>
                  <TableCell
                    className={promotionRequestStyles.tableCell}
                    align="center"
                  >
                    Date Summited
                  </TableCell>
                  <TableCell
                    className={promotionRequestStyles.tableCell}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Table Boday */}
              <TableBody>
                {roomData.slice((pageIndex-1)*itemPerPage,(pageIndex-1)*itemPerPage + itemPerPage ).map((roomData, index) => (
                  <TableRow>
                    {/* <TableCell
                      className={promotionRequestStyles.tableCell}
                      align="center"
                    >
                      {index + 1}
                    </TableCell> */}
                    <TableCell>
                      <RoomInfomation roomData={roomData} />
                    </TableCell>
                    <TableCell
                      className={promotionRequestStyles.tableCell}
                      align="center"
                    >
                      {new Date(roomData?.createTime).toLocaleString()}
                    </TableCell>
                    <TableCell
                      className={promotionRequestStyles.actions}
                      align="center"
                    >
                      <CNButton
                        buttonType="main"
                        fullWidth
                        // onClick={openConfirm(roomData.id)}
                      >
                        Approve
                      </CNButton>
                      <CNButton
                        className={promotionRequestStyles.declineButton}
                        buttonType="main"
                        fullWidth
                        // onClick={openConfirmDelete(roomData.id)}
                      >
                        Decline
                      </CNButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h1 style={{ margin: '0 auto' }}>List pending rooms is empty</h1>
        )}
        <CNPagination page = {paginationState.currentValue} total={paginationState.total} />
      </Container>
    </Wrapper>
  );
};
