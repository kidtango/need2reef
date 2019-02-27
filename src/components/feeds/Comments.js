import React from 'react';
import { Query } from 'react-apollo';
import { Box, IconButton, Text, Avatar, Container, Mask } from 'gestalt';
import { format } from 'date-fns';
import { GET_FEED_COMMENTS_QUERY } from '../graphql/queries';
import SmallerSpinner from '../spinner/SmallerSpinner';
import DeleteComment from './DeleteComment';
import Reply from './Reply';
import CreateReply from './CreateReply';
import EditComment from './EditComment';
import withSession from '../withSession';

const Comments = ({ feed, session }) => {
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
                        session={session}
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
                      <Box>
                        <CreateReply
                          commentId={feedComment.id}
                          refetch={refetch}
                        />
                      </Box>
                      <Box>
                        <EditComment
                          refetch={refetch}
                          feedCommentBody={comment.node.body}
                          feedComment={comment.node}
                          session={session}
                        />
                      </Box>
                      <Box>
                        <IconButton icon='heart' size='xs' />
                      </Box>
                    </Box>
                  </Box>

                  {/* Reply section */}
                  <Reply feedComment={feedComment} session={session} />
                </React.Fragment>
              );
            })}
          </Box>
        );
      }}
    </Query>
  );
};

export default withSession(Comments);
