/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import PolkaProvider from './api/polka/provider';
import Home from './pages/home';
import TransHOC from './components/trans';
import theme from './themes';
import Header from './components/header';
import Footer from './components/footer';
import { getClient } from './api/graph';

import './i18n';

export const App = () => {
  return (
    <ApolloProvider client={getClient()}>
      <ChakraProvider theme={theme}>
        <PolkaProvider>
          <HashRouter>
            <TransHOC>
              <Header />
              <Switch>
                <Route exact strict path="/" component={Home} />
              </Switch>
              <Footer />
            </TransHOC>
          </HashRouter>
        </PolkaProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};
