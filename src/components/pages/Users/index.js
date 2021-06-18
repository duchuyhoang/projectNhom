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

const Users = (props) => {
  const { path } = useRouteMatch();
  console.log('🚀 ~ path', path);

  return (
    <>
      <Suspense fallback={<CNLoading />}>
        <Switch>
          <Route path={`${path}/add-room`} exact component={FormAddRoom} />
          <Route
            path={`${path}/profile/:id_user`}
            exact
            component={UserProfilePage}
          />

          <PrivateRoute accessRule="CO_ADMIN">
            <Route
              path={`${path}/pending`}
              exact
              component={UserPromotionRequest}
            />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </>
  );
};
export default Users;
