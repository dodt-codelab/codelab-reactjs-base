import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthWrapper from 'wrappers/AuthWrapper';
const SignIn = lazy(() => import('pages/SignIn'));
const SignUp = lazy(() => import('pages/SignUp'));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/" component={AuthWrapper} />
      </Switch>
    </div>
  );
}
