import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'gestalt/dist/gestalt.css';
import { Provider } from './context';

import App from './components/App';
import Profile from './components/profile/Profile';
import Navbar from './components/navbar/Navbar';
import { endpoint } from './config';
import { getToken } from './utils';
import withSession from './components/withSession';

// using Apollo client to send auth header to backend
const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
  fetchOptions: {
    credentials: 'include'
  },

  request: operation => {
    const token = getToken();
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Provider>
      <Navbar session={session} />
      <Switch>
        <Route component={App} exact path='/' />
        <Route render={() => <Profile session={session} />} path='/profile' />
      </Switch>
    </Provider>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
