import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Box, IconButton, Text, Avatar, Touchable } from 'gestalt';
import { format } from 'date-fns';
import { GET_FEED_COMMENTS_QUERY } from '../graphql/queries';
import { GET_MORE_FEED_COMMENTS_QUERY } from '../graphql/queries';
import SmallerSpinner from '../spinner/SmallerSpinner';
import DeleteComment from './DeleteComment';
import Reply from './Reply';
import CreateReply from './CreateReply';
import EditComment from './EditComment';
import withSession from '../withSession';
import AvatarMedium from '../avatars/AvatarMedium';

class Comments extends Component {
  state = {
    hasMoreComments: false
  };

  getMoreComments = (e, fetchMore, feedId, data) => {
    const { endCursor } = data.feedCommentsConnection.pageInfo;

    fetchMore({
      query: GET_MORE_FEED_COMMENTS_QUERY,
      variables: {
        cursor: endCursor,
        id: feedId
      },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        const previousComments = previousResult.feedCommentsConnection.edges;
        const newComments = fetchMoreResult.feedCommentsConnection.edges;
        const newCursor =
          fetchMoreResult.feedCommentsConnection.pageInfo.endCursor;
        const hasNextComments =
          fetchMoreResult.feedCommentsConnection.pageInfo.hasNextPage;

        this.setState({ hasMoreComments: hasNextComments });

        return {
          feedCommentsConnection: {
            pageInfo: {
              __typename:
                previousResult.feedCommentsConnection.pageInfo.__typename,
              endCursor: newCursor,
              hasNextPage: hasNextComments
            },
            __typename: previousResult.feedCommentsConnection.__typename,
            edges: [...previousComments, ...newComments]
          }
        };
      }
    });
  };

  render() {
    const feedId = this.props.feed.node.id;
    const { session } = this.props;
    return (
      <Query query={GET_FEED_COMMENTS_QUERY} variables={{ id: feedId }}>
        {({ data, loading, error, refetch, fetchMore }) => {
          if (error) return <p>Error..</p>;
          if (loading) return <SmallerSpinner />;

          this.state.hasMoreComments =
            data.feedCommentsConnection.pageInfo.hasNextPage;

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
                      {/* <Box paddingX={1}>
                        <Avatar
                          name={feedComment.author.name}
                          size='md'
                          src={feedComment.author.profilePicture[0].picture}
                        />
                      </Box>
                      <Box>
                        <Text bold size='sm' align='left'>
                          {feedComment.author.name}
                        </Text>
                      </Box> */}
                      <AvatarMedium
                        name={feedComment.author.name}
                        picture={feedComment.author.profilePicture[0].picture}
                        profileId={feedComment.author.profile.id}
                      />
                      <Box paddingX={2} center>
                        <DeleteComment
                          refetch={refetch}
                          feedComment={feedComment}
                          feedId={feedId}
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
              {/* Load more comments button */}
              <Box display='flex' justifyContent='end' padding={1}>
                <Touchable
                  onTouch={e =>
                    this.getMoreComments(e, fetchMore, feedId, data)
                  }
                >
                  <Text bold color='gray' size='sm'>
                    {this.state.hasMoreComments ? 'Load More Comments' : null}
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

export default withSession(Comments);
