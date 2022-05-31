import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import RoutingComponent from '~/components/public/routing-component';
import {
  adminLayoutOptions,
  guestOptions,
  guestOptionsDefault,
} from './options/index';
import AdminLayout from '~/layouts/Admin';
import {reqMenuAdminTitleChange} from '~/reduxs/layout/action';

export const GuestRouter = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        {guestOptions.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            component={(props) => (
              <AddRoutingRouteComponent
                {...props}
                addRoutingComponent={item.component}
              />
            )}
          />
        ))}
        {adminLayoutOptions.map(
          (item, index) => !item.isTitle && handleRoute(item, index, props),
        )}
        <Redirect from="/" to={guestOptionsDefault} />
      </Switch>
    </BrowserRouter>
  );
};

const handleRoute = (item, index) => {
  var subs = item.subMenus || {};
  if (subs && subs.length > 0) {
    subs.map((sub, key) => {
      return (
        <Route
          key={key + 100}
          path={sub.path}
          render={(props) => (
            <AdminLayout
              {...props}
              PageComponent={
                <RouteComponent
                  {...props}
                  header={sub.menu}
                  component={sub.component}
                />
              }
              isNullHeader={item.isNullHeader}
            />
          )}
        />
      );
    });
  }

  return (
    <Route
      key={index + 10}
      path={item.path}
      render={(props) => (
        <AdminLayout
          {...props}
          PageComponent={
            <RouteComponent
              {...props}
              header={item.menu}
              component={item.component}
            />
          }
          isNullHeader={item.isNullHeader}
        />
      )}
    />
  );
};

const AddRoutingRouteComponent = (props) => {
  return (
    <>
      <RoutingComponent />
      <props.addRoutingComponent {...props} />
    </>
  );
};

const RouteComponent = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqMenuAdminTitleChange(props.header));
  }, [dispatch]);
  return (
    <>
      <RoutingComponent />
      <props.component {...props} />
    </>
  );
};
