import React, { Suspense } from 'react';
import { CNLoading } from '@Components/shared/CNLoading/CNLoading';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@Components/PrivateRoute';

const FormAddRoom = loadable(() => import('./form/AddRoom'), {
  fallback: <CNLoading />,
});

const UserProfilePage = loadable(
  () => import('./UserProfilePage/UserProfilePage'),
  {
    fallback: <CNLoading />,
  }
);

const UserPromotionRequest = loadable(
  () => import('./UserRequest/ListUserRequest'),
  {
    fallback: <CNLoading />,
  }
);

const RoomRequest = loadable(() => import('./PromotionRequest'), {
  fallback: <CNLoading />,
});

const Users = (props) => {
  const { path } = useRouteMatch();
  console.log('🚀 ~ path', path);

  return (
    <>
      <Suspense fallback={<CNLoading />}>
        <Switch>
          <Route
            path={`${path}/profile/:id_user`}
            exact
            component={UserProfilePage}
          />

          <PrivateRoute accessRule="MEMBER" path={`${path}/add-room`} exact>
            <FormAddRoom />
          </PrivateRoute>

          <PrivateRoute accessRule="CO_ADMIN" path={`${path}/pending`} exact>
            <UserPromotionRequest />
          </PrivateRoute>

          <PrivateRoute accessRule="CO_ADMIN" path={`${path}/promotion`} exact>
            <RoomRequest />
          </PrivateRoute>

          <Redirect to={'/home'} />
        </Switch>
      </Suspense>
    </>
  );
};
export default Users;
