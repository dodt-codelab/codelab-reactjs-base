import React, { lazy, Suspense } from 'react';
import Cookies from 'js-cookie';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';

import styles from './styles.module.scss';
import { getProfile } from 'api/profile';

import PageHeader from 'components/PageHeader';
import SideNav from 'components/SideNav';
const Home = lazy(() => import('pages/Home'));
const Tasks = lazy(() => import('pages/Tasks'));

export default function PageWrapper() {
  const isAuthenticated = !!Cookies.get('accessToken');
  const { data: profile } = useQuery('profile', getProfile, { enabled: isAuthenticated });

  if (!isAuthenticated) return <Redirect to="/sign-in" />;
  if (!profile) return null;

  return (
    <div className={styles.pageWrapper}>
      <SideNav />
      <div className={styles.mainWrapper}>
        <PageHeader profile={profile} />
        <div className={styles.pageContent}>
          <Suspense fallback={null}>
            <Switch>
              <Route exact path="/tasks" component={Tasks} />

              <Route exact path="/" component={Home} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
