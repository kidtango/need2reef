import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { format } from 'date-fns';
import { Box, IconButton, Text, Avatar, Container, Mask } from 'gestalt';
import { GET_FEEDS_QUERY } from '../graphql/queries';
import Spinner from '../spinner/Spinner';

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
          console.log(data.feedsConnection.edges);

          return (
            <Container>
              {data.feedsConnection.edges.map(feed => (
                <Box
                  display='flex'
                  direction='column'
                  alignItems='stretch'
                  justifyContent='between'
                  wrap
                  shape='rounded'
                  padding={2}
                  color='lightGray'
                  margin={10}
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
                      <Avatar name='Scott Tang' size='md' />
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
                      <IconButton
                        icon='ellipsis'
                        size='xl'
                        onClick={this.handleClick}
                      />
                    </Box>
                  </Box>

                  <Box
                    padding={2}
                    justifyContent='center'
                    alignSelf='center'
                    shape='rounded'
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
                  <Box padding={1}>
                    <Box maxWidth={450}>
                      <Box
                        display='flex'
                        justifyContent='start'
                        alignItems='center'
                        position='relative'
                        width={450}
                        wrap
                      >
                        <Box paddingX={1}>
                          <Avatar name='Scott' size='sm' />
                        </Box>
                        <Box>
                          <Text bold size='xs' align='left'>
                            Scott
                          </Text>
                        </Box>
                        <Box paddingX={2} center>
                          Delete
                        </Box>
                      </Box>
                      <Box paddingX={3} paddingY={1}>
                        <Text align='left' color='green' size='sm' bold>
                          {feed.node.message}
                        </Text>

                        <Box
                          direction='row'
                          alignItems='center'
                          display='flex'
                          paddingY={1}
                        >
                          <Box paddingX={1}>
                            <Text color='gray' italic size='xs'>
                              {format(feed.node.createdAt, 'MMM d, YYYY', {
                                awareOfUnicodeTokens: true
                              })}
                            </Text>
                          </Box>
                          <Box>Reply</Box>
                          <Box>Edit</Box>
                          <Box>
                            <IconButton icon='heart' size='xs' />
                          </Box>
                        </Box>
                      </Box>

                      <Box paddingX={6}>
                        <Box
                          display='flex'
                          direction='row'
                          alignItems='center'
                          position='relative'
                          wrap
                        >
                          <Avatar name='Tiger' size='sm' />
                          <Box paddingX={1}>
                            <Text bold size='xs'>
                              Tiger
                            </Text>
                          </Box>
                          <Box paddingX={2}>Delete Reply</Box>
                        </Box>
                        <Box paddingX={2} paddingY={2}>
                          <Text color='orange' size='sm' bold>
                            Reply body...
                          </Text>
                          <Box
                            direction='row'
                            alignItems='center'
                            display='flex'
                          >
                            <Box>
                              <Text color='gray' italic size='xs'>
                                12 dec
                                {/* {format(post.node.createdAt, 'MMM d, YYYY', {
                            awareOfUnicodeTokens: true
                          })} */}
                              </Text>
                            </Box>
                            <Box>Reply</Box>
                            <Box>Edit</Box>
                            <Box paddingX={1}>
                              <IconButton icon='heart' size='xs' />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box>
                    <p>input textbox</p>
                  </Box>
                </Box>
              ))}
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default Feeds;
