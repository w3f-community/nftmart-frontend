/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/home';
import TransHOC from './components/trans';
import theme from './themes';
import Header from './components/header';
import Footer from './components/footer';

import './i18n';

export const App = () => (
  <ChakraProvider theme={theme}>
    <HashRouter>
      <TransHOC>
        <Header />
        <Switch>
          <Route exact strict path="/" component={Home} />
        </Switch>
        <Footer />
      </TransHOC>
    </HashRouter>
  </ChakraProvider>
);
