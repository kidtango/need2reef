import React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER, GET_CURRENT_USER_PROFILE } from './queries/index';
import Spinner from './Spinner';
import { Box, Container } from 'gestalt';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      console.log(data);
      if (loading)
        return (
          <Container>
            <Box
              display='flex'
              padding={10}
              position='relative'
              justifyContent='center'
            >
              <Spinner />
            </Box>
          </Container>
        );
      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

export default withSession;
