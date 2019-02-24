import React from 'react';
import UnAuthNav from './unAuthNav/UnAuthNav';
import AuthNav from './authNav/AuthNav';
import { getToken } from '../../utils/index';

// (getToken().length !== 0 ? <AuthNav /> : <UnAuthNav />)

const Navbar = ({ session }) =>
  getToken().length !== 0 ? <AuthNav session={session} /> : <UnAuthNav />;

export default Navbar;
