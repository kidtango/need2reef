import React from 'react';
import { Query } from 'react-apollo';
import { Box, IconButton, Text, Avatar, Container, Mask } from 'gestalt';
import { format } from 'date-fns';
import { GET_FEED_COMMENTS_QUERY } from '../graphql/queries';
import SmallerSpinner from '../spinner/SmallerSpinner';
import DeleteComment from './DeleteComment';

const Comments = ({ feed }) => {
  const { id } = feed.node;
  return (
    <Query query={GET_FEED_COMMENTS_QUERY} variables={{ id: id }}>
      {({ data, loading, error, refetch }) => {
        if (error) return <p>Error..</p>;
        if (loading) return <SmallerSpinner />;

        return (
          <Box maxWidth={450}>
            {data.feedCommentsConnection.edges.map(comment => {
              const feedComment = comment.node;

              return (
                <React.Fragment>
                  <Box
                    display='flex'
                    justifyContent='start'
                    alignItems='center'
                    position='relative'
                    width={450}
                    wrap
                  >
                    <Box paddingX={1}>
                      <Avatar name={feedComment.author.name} size='sm' />
                    </Box>
                    <Box>
                      <Text bold size='xs' align='left'>
                        {feedComment.author.name}
                      </Text>
                    </Box>
                    <Box paddingX={2} center>
                      <DeleteComment
                        refetch={refetch}
                        feedComment={feedComment}
                        feedId={id}
                      />
                    </Box>
                  </Box>
                  <Box paddingX={3} paddingY={1}>
                    <Text align='left' color='green' size='sm' bold>
                      {feedComment.body}
                    </Text>

                    <Box
                      direction='row'
                      alignItems='center'
                      display='flex'
                      paddingY={1}
                    >
                      <Box paddingX={1}>
                        <Text color='gray' italic size='xs'>
                          {format(feedComment.createdAt, 'MMM d, YYYY', {
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
                    {feedComment.reply.map(reply => (
                      <React.Fragment>
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
                            {reply.body}
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
                      </React.Fragment>
                    ))}
                  </Box>
                </React.Fragment>
              );
            })}
          </Box>
        );
      }}
    </Query>
  );
};

export default Comments;
