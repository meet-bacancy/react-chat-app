import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const DashBoard = lazy(() => import('../pages/DashBoard'));
const NoMatch = lazy(() => import('../pages/NoMatch'));

const AuthorisedApp = () => {
  return (
    <div className="layout">
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route exact path="/:roomId" component={DashBoard} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default AuthorisedApp;
