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

const FormAddRoom = loadable(() => import('./form/AddRoom'), {
  fallback: <CNLoading />,
});
const HomeListPage = loadable(() => import('../Property/list/index'), {
  fallback: <CNLoading />,
});

const UserProfilePage = loadable(
  () => import('./UserProfilePage/UserProfilePage'),
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
        </Switch>
      </Suspense>
    </>
  );
};
export default Users;
