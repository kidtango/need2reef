import React from 'react';

import './App.css';
import Profiles from './home/Profiles';
import { getToken } from '../utils';
import Signin from './auth/Signin';
import Feeds from './feeds/Feeds';

const Home = ({ session }) =>
  getToken().length !== 0 ? <Feeds /> : <Signin />;
// <Feeds />

export default Home;
