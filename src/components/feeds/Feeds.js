import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Box, Text, Avatar, Container, Mask } from 'gestalt';
import { GET_FEEDS_QUERY } from '../graphql/queries';
import Spinner from '../spinner/Spinner';
import CreateComments from './CreateComments';
import FeedsMenu from './menu/FeedsMenu';
import DeleteFeed from './DeleteFeed';
import Comments from './Comments';

class Feeds extends Component {
  render() {
    return (
      <Query query={GET_FEEDS_QUERY}>
        {({ data, loading, error, refetch }) => {
          if (error) return <Text>uh ohhh... Something went wrong!</Text>;
          if (loading)
            return (
              <Box display='flex' justifyContent='center' padding={5}>
                <Spinner />
              </Box>
            );

          return (
            <React.Fragment>
              {/* menu */}
              <FeedsMenu />

              <Container>
                <Box
                  display='flex'
                  direction='column'
                  alignItems='stretch'
                  justifyContent='between'
                  wrap
                  padding={2}
                >
                  {data.feedsConnection.edges.map(feed => (
                    <Box
                      padding={1}
                      color='lightGray'
                      margin={5}
                      shape='rounded'
                    >
                      <Box
                        display='flex'
                        justifyContent='between'
                        alignItems='center'
                        position='relative'
                        direction='row'
                        wrap
                      >
                        <Box display='flex' paddingX={1} alignItems='center'>
                          <Avatar name={feed.node.author.name} size='md' />
                          <Box display='flex' paddingX={1}>
                            <Text bold size='sm' align='left'>
                              {feed.node.author.name}
                            </Text>
                          </Box>
                        </Box>

                        <Box
                          direction='row'
                          justifyContent='start'
                          marginLeft={10}
                          dangerouslySetInlineStyle={{
                            __style: {
                              zIndex: 1
                            }
                          }}
                        >
                          {/* Delete Feed */}
                          <DeleteFeed feed={feed} />
                        </Box>
                      </Box>
                      <Box marginLeft={4} marginBottom={2}>
                        <Text align='left' color='green' size='md' bold>
                          {feed.node.message}
                        </Text>
                      </Box>

                      <Box
                        padding={2}
                        justifyContent='center'
                        alignSelf='center'
                        shape='rounded'
                        marginBottom={2}
                      >
                        <Mask shape='rounded'>
                          {feed.node.images[0] ? (
                            <img
                              style={{ maxWidth: '100%', display: 'block' }}
                              src={feed.node.images[0].url}
                            />
                          ) : (
                            <img
                              style={{ maxWidth: '100%', display: 'block' }}
                              src='/public/assets/tank1.jpg'
                            />
                          )}
                        </Mask>
                      </Box>
                      <Box paddingX={5}>
                        {/* Comment Section */}
                        <Comments feed={feed} />
                        {/* add new comments section*/}
                        <CreateComments feedId={feed.node.id} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Container>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Feeds;
