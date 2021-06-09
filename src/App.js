import React, { lazy, Suspense } from 'react';
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
import UserPageRoute from "@Components/pages/Users"
import { CNLoading } from '@Components/shared/CNLoading/CNLoading';
import { PrivateRoute } from "@Components/PrivateRoute";
import AddRoom from '@Components/pages/Users/form/AddRoom'


export const App = ({ title }) => {
  return (
    <>
      <Router>
        {/* <NavBar currentTab={'properties'}></NavBar> */}
        <Suspense fallback={<CNLoading />}>
          <Switch>
            <Route path="/test" component={Message}>
              {/* <Message /> */}
            </Route>

            <Route path="/home" component={Home} />

            <Route path="/property" component={Property} />

            <Route path="/users" >
              <PrivateRoute accessRule="MEMBER"> <UserPageRoute /> </PrivateRoute>
                <Switch>
                <Route path="/add-room" component={AddRoom}/>
                </Switch>
                 
               
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
