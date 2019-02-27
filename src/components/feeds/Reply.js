import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Box, IconButton, Text, Avatar, Touchable } from 'gestalt';
import { format } from 'date-fns';
import { GET_FEED_COMMENT_REPLIES } from '../graphql/queries';
import { GET_MORE_FEED_COMMENT_REPLIES } from '../graphql/queries';
import SmallerSpinner from '../spinner/SmallerSpinner';
import CreateReply from './CreateReply';
import DeleteCommentReply from './DeleteCommentReply';
import EditCommentReply from './EditCommentReply';

class Reply extends Component {
  state = {
    hasMoreReplies: false
  };

  getReplies = (e, fetchMore, commentId, data) => {
    const { endCursor } = data.feedCommentRepliesConnection.pageInfo;
    console.log('TCL: Reply -> getReplies -> endCursor', endCursor);

    fetchMore({
      query: GET_MORE_FEED_COMMENT_REPLIES,
      variables: {
        cursor: endCursor,
        commentId
      },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        const previousComments =
          previousResult.feedCommentRepliesConnection.edges;
        const newComments = fetchMoreResult.feedCommentRepliesConnection.edges;
        const newCursor =
          fetchMoreResult.feedCommentRepliesConnection.pageInfo.endCursor;
        const hasNextComments =
          fetchMoreResult.feedCommentRepliesConnection.pageInfo.hasNextPage;

        this.setState({ hasMoreReplies: hasNextComments });

        return {
          feedCommentRepliesConnection: {
            pageInfo: {
              __typename:
                previousResult.feedCommentRepliesConnection.pageInfo.__typename,
              endCursor: newCursor,
              hasNextPage: hasNextComments
            },
            __typename: previousResult.feedCommentRepliesConnection.__typename,
            edges: [...previousComments, ...newComments]
          }
        };
      }
    });
  };

  render() {
    const { feedComment, session } = this.props;
    const commentId = feedComment.id;

    return (
      <Query
        query={GET_FEED_COMMENT_REPLIES}
        variables={{ commentId: commentId }}
      >
        {({ data, loading, error, refetch, fetchMore }) => {
          if (error) return <p>Something went wrong</p>;
          if (loading) return <SmallerSpinner />;

          this.state.hasMoreReplies =
            data.feedCommentRepliesConnection.pageInfo.hasNextPage;

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
                      <DeleteCommentReply
                        reply={reply.node}
                        feedComment={feedComment}
                      />
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
                      <Box>
                        <EditCommentReply
                          commentReply={reply.node}
                          refetch={refetch}
                          session={session}
                          commentReplyBody={reply.node.body}
                        />
                      </Box>
                      <Box paddingX={1}>
                        <IconButton icon='heart' size='xs' />
                      </Box>
                    </Box>
                  </Box>
                </React.Fragment>
              ))}

              {/* Load more comments button */}
              <Box display='flex' justifyContent='end' padding={1}>
                <Touchable
                  onTouch={e => this.getReplies(e, fetchMore, commentId, data)}
                >
                  <Text bold color='gray' size='sm'>
                    {this.state.hasMoreReplies ? 'Load More Replies' : null}
                  </Text>
                </Touchable>
              </Box>
            </Box>
          );
        }}
      </Query>
    );
  }
}

export default Reply;
