import React, { Suspense } from 'react';
import { CNLoading } from '@Components/shared/CNLoading/CNLoading';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from '@Components/PrivateRoute';

const HomeListPage = loadable(() => import('./listRoom/index'), {
  fallback: <CNLoading />,
});
const RoomInfo = loadable(() => import('./roomInfo/index'), {
  fallback: <CNLoading />,
});

const Property = (props) => {
  const { path } = useRouteMatch();
console.log(path);
  return (
    <>
      <Suspense fallback={<CNLoading />}>
        <Switch>

        <Route path={`${path}`} exact component={HomeListPage} />

          <PrivateRoute accessRule="GUEST" path={`${path}/:name_router`} exact>
          <RoomInfo/>
          </PrivateRoute>
        

          
          {/* <Route path="/" /> */}
        </Switch>
      </Suspense>
    </>
  );
};
export default Property;
