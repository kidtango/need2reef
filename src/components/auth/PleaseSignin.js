import React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../graphql/queries';
import Signin from '../auth/Signin';
import Spinner from '../spinner/Spinner';

const PleaseSignin = props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) return <Signin />;
      if (loading) return <Spinner />;

      return props.children;
    }}
  </Query>
);

export default PleaseSignin;
