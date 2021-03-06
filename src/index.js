import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'gestalt/dist/gestalt.css';
import { Provider } from './context';

import Home from './components/Home';
import Profile from './components/profile/Profile';
import Navbar from './components/navbar/Navbar';
import { endpoint } from './config';
import { getToken } from './utils';
import withSession from './components/withSession';
import Signup from './components/auth/Signup';
import PleaseSignin from './components/auth/PleaseSignin';
import PersonalProfile from './components/profile/PersonalProfile';
import Profiles from './components/home/Profiles';

// using Apollo client to send auth header to backend
// process.env.NODE_ENV === 'development' ? endpoint : endpoint
const client = new ApolloClient({
  uri: 'https://tweef-node-server.herokuapp.com/',
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

const Root = ({ session }) => (
  <Router>
    <Provider>
      <Navbar session={session} />
      <Switch>
        <Route render={() => <Home session={session} />} exact path='/' />
        <Route component={Signup} path='/signup' />
        <Route
          render={() => (
            <PleaseSignin>
              <PersonalProfile session={session} />
            </PleaseSignin>
          )}
          path='/my_profile'
        />
        <Route component={Profile} path='/profile/:profileId' />
        <Route component={Profiles} path='/profiles' />
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
