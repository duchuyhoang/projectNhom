import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
const Message = lazy(() => import('@Components/Message'));
import { NavBar } from '@Components/components/NavBar/NavBar';
const Home = lazy(() => import('@Components/pages/Home'));
const Property = lazy(() => import('@Components/pages/Property'));
// const Users = lazy(() => import('@Components/pages/Users'));
import UserPageRoute from '@Components/pages/Users';
import { CNLoading } from '@Components/shared/CNLoading/CNLoading';
import { PrivateRoute } from '@Components/PrivateRoute';

export const App = ({ title }) => {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <>
      <Router>
        <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab}></NavBar>
        <Suspense fallback={<CNLoading />}>
          <Switch>
            <Route path="/test" component={Message}>
              {/* <Message /> */}
            </Route>

            <Route path="/home" component={Home} />

            <Route path="/properties" component={Property} />

            <Route path="/users">
              <PrivateRoute accessRule="MEMBER">
                {' '}
                <UserPageRoute />{' '}
              </PrivateRoute>
            </Route>

            <Route path="/">
              <Redirect
                to={{
                  pathname: '/home',
                }}
              />
            </Route>
          </Switch>
        </Suspense>
        {/* </Content> */}
      </Router>
    </>
  );
};
