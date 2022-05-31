import React from 'react';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import './App.scss'; // css default

import {GuestRouter} from './routers/Router';
import ErrorComponent from '~/components/public/error-component';
import store from './reduxs/store';
import i18n from './i18n';

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ErrorComponent />
        <GuestRouter />
      </I18nextProvider>
    </Provider>
  );
};

export default App;
