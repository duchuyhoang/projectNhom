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
import { CNButton } from '@Components/shared/CNButton/CNButton';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import { CNTextField } from '@Components/shared/CNTextField/CNTextField';
import { useListUserRequest } from './useListUserRequest';
import { Link } from 'react-router-dom';
import { userPermissionWithNumber } from '@Core/const';
import Moment from 'react-moment';
import CNConfirm from '@Components/shared/CNConfirm/CNConfirm';
const useListUserRequestStyles = makeStyles((theme) => ({
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
  link: {
    textDecoration: 'none',
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
    width: 100;
    height: 200;
    border-radius: 6px;
  }
`;
const RightContainerRoomInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;
const UserName = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  font-weight: 700;
  margin-bottom: 10px;
  display: inline-block;
  color: ${(props) => props.theme.palette.primary.main};
`;
const UserItemInfo = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
`;

const UserItemLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.palette.text.primary};
  transition: all 0.2s;
  &:hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;
const RoomInfomation = ({ userData }) => {
  return (
    <ContainerRoomInfo>
      <LeftContainerRoomInfo>
        <img src={userData?.avatar || noImage} height="100" width="100" />
      </LeftContainerRoomInfo>
      <RightContainerRoomInfo>
        <UserName>{userData?.user_name}</UserName>

        <UserItemInfo>
          Phone :{' '}
          <UserItemLink href={`tel:${userData?.phone}`}>
            <strong>{userData?.phone}</strong>
          </UserItemLink>
        </UserItemInfo>
        <UserItemInfo>
          Email :{' '}
          <UserItemLink
            href={`mailto:${userData?.email}?subject=From%20Dinh%20Van%20Do%20with%20Love!&body=Xin%20Chao`}
          >
            <strong>{userData?.email}</strong>
          </UserItemLink>
        </UserItemInfo>
      </RightContainerRoomInfo>
    </ContainerRoomInfo>
  );
};

const ListUserRequest = () => {
  const { userDataList, selectedInfo, setSelectedInfo,handleConfirm,handleReject } = useListUserRequest();
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [rejectApprove, setRejectApprove] = useState(false);
  const listUserRequest = useListUserRequestStyles();
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
      {/* Approve */}
      <CNConfirm
        showConfirm={confirmApprove}
        messenger="Approve ?"
        setShowConfirm={setConfirmApprove}
        onAccept={() => {
          if (selectedInfo.id_user && selectedInfo.id) {
            handleConfirm()
          }
          setConfirmApprove(false);
        }}
        onCancel={() => {
          setSelectedInfo({ id_user: null, id: null });
          setConfirmApprove(false);
        }}
      />

      <CNConfirm
        showConfirm={rejectApprove}
        messenger="Reject ?"
        setShowConfirm={setRejectApprove}
        onAccept={() => {
          if (selectedInfo.id_user && selectedInfo.id) {
            handleReject()
          }
          setRejectApprove(false);
        }}
        onCancel={() => {
          setSelectedInfo({ id_user: null, id: null });
          setRejectApprove(false);
        }}
      />

      <Container>
        <Header>
          <Title>List User Request</Title>
          <form
            className={listUserRequest.mainForm}
            onSubmit={handleSubmit(searchHandler)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl className={listUserRequest.formControl}>
                  <CNTextField
                    placeholder="Enter your keyword"
                    value={value ? value : ''}
                    error={!!formState.errors['name']}
                    inputChange={(e) => {
                      onChange(e);
                    }}
                  />
                  <FormHelperText className={listUserRequest.helperText}>
                    {formState.errors['name']?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <CNButton
              className={listUserRequest.buttonSearch}
              type="submit"
              buttonType="main"
            >
              Search
            </CNButton>
          </form>
        </Header>
        {userDataList.length > 0 ? (
          <TableContainer
            className={listUserRequest.tableContainer}
            component={Paper}
          >
            <Table>
              <TableHead>
                <TableRow className={listUserRequest.tableHead}>
                  <TableCell
                    className={listUserRequest.tableCell}
                    align="center"
                  >
                    STT
                  </TableCell>
                  <TableCell
                    className={listUserRequest.tableCell}
                    align="center"
                  >
                    User Infomation
                  </TableCell>
                  <TableCell
                    className={listUserRequest.tableCell}
                    align="center"
                  >
                    User Permission
                  </TableCell>
                  <TableCell
                    className={listUserRequest.tableCell}
                    align="center"
                  >
                    Date Summited
                  </TableCell>
                  <TableCell
                    className={listUserRequest.tableCell}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Table Boday */}
              <TableBody>
                {userDataList.map((userData, index) => (
                  <TableRow>
                    <TableCell
                      className={listUserRequest.tableCell}
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <RoomInfomation userData={userData} />
                    </TableCell>
                    <TableCell
                      align="center"
                      className={listUserRequest.tableCell}
                    >
                      {/* {'CO_ADMIN'} */}
                      {userPermissionWithNumber[userData.permission || -1]}
                    </TableCell>
                    <TableCell
                      className={listUserRequest.tableCell}
                      align="center"
                    >
                      {Date.now() - new Date(userData.action_time).getTime() >
                      604800000 ? (
                        <Moment format="DD/MM/YYYY">
                          {userData.action_time}
                        </Moment>
                      ) : (
                        <Moment toNow>{userData.action_time}</Moment>
                      )}
                    </TableCell>
                    <TableCell
                      className={listUserRequest.actions}
                      align="center"
                    >
                      <CNButton
                        buttonType="main"
                        fullWidth
                        onClick={() => {
                          setSelectedInfo({
                            id_user: userData.id_user,
                            id: userData.id,
                          });
                          setConfirmApprove(true);
                        }}
                      >
                        Approve
                      </CNButton>
                      <CNButton
                        className={listUserRequest.declineButton}
                        buttonType="main"
                        fullWidth
                        onClick={() => {
                          setSelectedInfo({
                            id_user: userData.id_user,
                            id: userData.id,
                          });
                          setRejectApprove(true);
                        }}
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
          <h1 style={{ margin: '0 auto' }}>List user requests is empty</h1>
        )}
      </Container>
    </Wrapper>
    // <div>dada</div>
  );
};

export default ListUserRequest;
