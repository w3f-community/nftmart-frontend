/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import PolkaProvider from './api/polka/provider';
import TransHOC from './components/trans';
import theme from './themes';
import Header from './components/header';
import Footer from './components/footer';
import { getClient } from './api/graph';

import './i18n';

import Home from './pages/home';
import Explore from './pages/explore';
import Wallet from './pages/wallet';
import Detail from './pages/detail';
import Create from './pages/create';

export const App = () => {
  return (
    <ApolloProvider client={getClient()}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        
        <HashRouter>
          <TransHOC>
            <Header />
            <PolkaProvider>
              <Switch>
                <Route exact strict path="/" component={Home} />
                <Route exact strict path="/explore" component={Explore} />
                <Route exact strict path="/wallet" component={Wallet} />
                <Route exact strict path="/detail/*" component={Detail} />
                <Route exact strict path="/create" component={Create} />
              </Switch>
            </PolkaProvider>
            <Footer />
          </TransHOC>
        </HashRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
};
