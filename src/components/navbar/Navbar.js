import React from 'react';
import UnAuthNav from './unAuthNav/UnAuthNav';

// (getToken().length !== 0 ? <AuthNav /> : <UnAuthNav />)

const Navbar = ({ session }) => {
  console.log(session);
  return <UnAuthNav session={session} />;
};

export default Navbar;
