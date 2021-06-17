import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import { userPermission } from '@Core/const';
import { authSelectors } from '@Core/redux/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DropDownItem = styled.div`
  display: flex;
  /* justify-content:space-around; */
  align-items: center;
  padding: 5px;
  font-size: 17px;
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: black;
  &:hover {
    background: #c5cdd9;
  }
`;
const DropDownContainer = styled.div`
  & ${DropDownItem}:not(:last-child) {
    border-bottom: 1px solid #c5cdd9;
  }
`;

const ModifiedIcon = styled(SVGIcon)`
  margin-right: 10px;
`;

export const DropDownUserInfo = ({ signOutHandle }) => {
  const permission = useSelector(authSelectors.selectCurrentUserPermissions);
  return (
    <>
      <DropDownContainer>
        <DropDownItem>
          <ModifiedIcon name="dashBoard" width="18" height="18" />
          Dash Board
        </DropDownItem>

        <DropDownItem onClick={signOutHandle}>
          <ModifiedIcon name="signout" width="18" height="18" />
          Sign Out
        </DropDownItem>

        <DropDownItem>
          <ModifiedIcon
            name="user"
            width="18"
            height="18"
            style={{ fill: 'black' }}
          />
          Profile
        </DropDownItem>
        {userPermission[permission] >= 0 ? (
          <Link style={{ textDecoration: 'none' }} to="/users/add-room">
            <DropDownItem>
              <ModifiedIcon
                name="plus"
                width="18"
                height="18"
                style={{ fill: 'black' }}
              />
              Add Room
            </DropDownItem>
          </Link>
        ) : (
          ''
        )}
        {userPermission[permission] === 1 ? (
          <Link style={{ textDecoration: 'none' }} to="/test">
            <DropDownItem>
              <ModifiedIcon
                name="tick"
                width="18"
                height="18"
                style={{ fill: 'black' }}
              />
              Approve Room
            </DropDownItem>
          </Link>
        ) : (
          ''
        )}

        <DropDownItem>
          <ModifiedIcon
            name="password"
            width="18"
            height="18"
            style={{ fill: 'black' }}
          />
          Change Password
        </DropDownItem>

        <DropDownItem>
          <ModifiedIcon
            name="message"
            width="16"
            height="16"
            style={{ fill: 'black' }}
          />
          Message
        </DropDownItem>
      </DropDownContainer>
    </>
  );
};
