import React from 'react';
import { Query } from 'react-apollo';
import { Box, IconButton, Text, Avatar, Container, Mask } from 'gestalt';
import { format } from 'date-fns';
import { GET_FEED_COMMENT_REPLIES } from '../graphql/queries';
import SmallerSpinner from '../spinner/SmallerSpinner';
import CreateReply from './CreateReply';
import DeleteCommentReply from './DeleteCommentReply';

const Reply = ({ feedComment }) => {
  return (
    <Query
      query={GET_FEED_COMMENT_REPLIES}
      variables={{ commentId: feedComment.id }}
    >
      {({ data, loading, error }) => {
        if (error) return <p>Something went wrong</p>;
        if (loading) return <SmallerSpinner />;

        return (
          <Box paddingX={6}>
            {data.feedCommentRepliesConnection.edges.map(reply => (
              <React.Fragment>
                <Box
                  display='flex'
                  direction='row'
                  alignItems='center'
                  position='relative'
                  wrap
                >
                  <Avatar name={reply.node.author.name} size='sm' />
                  <Box paddingX={1}>
                    <Text bold size='xs'>
                      {reply.node.author.name}
                    </Text>
                  </Box>
                  <Box paddingX={2}>
                    <DeleteCommentReply />
                  </Box>
                </Box>
                <Box paddingX={2} paddingY={2}>
                  <Text color='orange' size='sm' bold>
                    {reply.node.body}
                  </Text>
                  <Box direction='row' alignItems='center' display='flex'>
                    <Box>
                      <Text color='gray' italic size='xs'>
                        {format(reply.node.createdAt, 'MMM d, YYYY', {
                          awareOfUnicodeTokens: true
                        })}
                      </Text>
                    </Box>
                    <Box>
                      <CreateReply commentId={feedComment.id} />
                    </Box>
                    <Box>Edit</Box>
                    <Box paddingX={1}>
                      <IconButton icon='heart' size='xs' />
                    </Box>
                  </Box>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        );
      }}
    </Query>
  );
};

export default Reply;
