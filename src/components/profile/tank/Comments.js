import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { format } from 'date-fns';
import { CREATE_TANK_COMMENT_MUTATION } from '../../graphql/mutations';
import {
  GET_COMMENTS_QUERY,
  GET_MORE_COMMENTS_QUERY
} from '../../graphql/queries';

import {
  Box,
  TextArea,
  IconButton,
  Text,
  Avatar,
  Layer,
  Flyout,
  Touchable
} from 'gestalt';
import Spinner from '../../spinner/Spinner';
import Reply from './Reply';
import DeleteComments from './DeleteComments';
import DeleteReply from './DeleteReply';
import EditComment from './EditComment';
import EditReply from './EditReply';
import AvatarMedium from '../../avatars/AvatarMedium';

class Comments extends Component {
  state = {
    value: '',
    open: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleDismiss = () => {
    this.setState({ open: false });
  };

  handleChange = ({ value }) => {
    this.setState({
      value
    });
  };

  getMoreComments = (e, fetchMore, data, tankId) => {
    const cursor = data.tankPostsConnection.pageInfo.endCursor;

    fetchMore({
      query: GET_MORE_COMMENTS_QUERY,
      variables: {
        cursor,
        id: tankId
      },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        const previousComments = previousResult.tankPostsConnection.edges;

        const newComments = fetchMoreResult.tankPostsConnection.edges;

        const newCursor =
          fetchMoreResult.tankPostsConnection.pageInfo.endCursor;

        const hasNextComments =
          fetchMoreResult.tankPostsConnection.pageInfo.hasNextPage;

        this.setState({ hasMoreComments: hasNextComments });

        return {
          tankPostsConnection: {
            pageInfo: {
              __typename:
                previousResult.tankPostsConnection.pageInfo.__typename,
              endCursor: newCursor,
              hasNextPage: hasNextComments
            },
            __typename: previousResult.tankPostsConnection.__typename,
            edges: [...previousComments, ...newComments]
          }
        };
      }
    });
  };

  createTankComment = async (e, createPostMutation, tankId, refetch) => {
    // On "Enter" keyDown, submit form
    if (e.key === 'Enter') {
      //Create new post
      await createPostMutation({
        variables: {
          body: this.state.value,
          tankId
        }
      });
      //refetch comments
      await refetch();

      //close text area
      this.setState({ open: false, value: '' });
    }
  };
  render() {
    const { tankId, session } = this.props;

    return (
      <Query query={GET_COMMENTS_QUERY} variables={{ id: tankId }}>
        {({ data, loading, error, refetch, fetchMore }) => {
          if (error) return <Text>uh ohhh... Something went wrong!</Text>;
          if (loading)
            return (
              <Box display='flex' justifyContent='center' padding={5}>
                <Spinner />
              </Box>
            );

          let hasMoreComments = data.tankPostsConnection.pageInfo.hasNextPage;

          return (
            <Mutation mutation={CREATE_TANK_COMMENT_MUTATION}>
              {(createTankPost, { loading, error }) => {
                if (loading) return <Spinner />;
                if (error) return <Text>uh ohhh... Something went wrong!</Text>;
                return (
                  <React.Fragment>
                    <Box
                      display='flex'
                      direction='column'
                      alignItems='start'
                      justifyContent='start'
                      wrap
                      shape='rounded'
                      padding={2}
                      color='lightGray'
                    >
                      {data.tankPostsConnection.edges.map(post => {
                        const ownsPost = session.me.id === post.node.author.id;
                        return (
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
                                <AvatarMedium
                                  name={post.node.author.name}
                                  picture={
                                    post.node.author.profilePicture[0].picture
                                  }
                                  profileId={post.node.author.profile.id}
                                />
                                <Box paddingX={2} center>
                                  <DeleteComments
                                    postId={post.node.id}
                                    refetch={refetch}
                                    ownsPost={ownsPost}
                                  />
                                </Box>
                              </Box>
                              <Box paddingX={3} paddingY={1}>
                                <Text
                                  align='left'
                                  color='green'
                                  key={post.node.id}
                                  size='sm'
                                  bold
                                >
                                  {post.node.body}
                                </Text>

                                <Box
                                  direction='row'
                                  alignItems='center'
                                  display='flex'
                                  paddingY={1}
                                >
                                  <Box paddingX={1}>
                                    <Text color='gray' italic size='xs'>
                                      {format(
                                        post.node.createdAt,
                                        'MMM d, YYYY',
                                        {
                                          awareOfUnicodeTokens: true
                                        }
                                      )}
                                    </Text>
                                  </Box>
                                  <Box>
                                    <Reply
                                      postId={post.node.id}
                                      refetch={refetch}
                                    />
                                  </Box>
                                  <Box>
                                    {ownsPost && (
                                      <EditComment
                                        refetch={refetch}
                                        comment={post.node.body}
                                        postId={post.node.id}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <IconButton icon='heart' size='xs' />
                                  </Box>
                                </Box>
                              </Box>
                              {post.node.replies.map(reply => {
                                const ownsReply =
                                  session.me.id === reply.author.id;
                                return (
                                  <Box paddingX={6}>
                                    <Box
                                      display='flex'
                                      direction='row'
                                      alignItems='center'
                                      position='relative'
                                      wrap
                                    >
                                      <AvatarMedium
                                        picture={
                                          reply.author.profilePicture[0].picture
                                        }
                                        name={reply.author.name}
                                        profileId={reply.author.profile.id}
                                      />

                                      <Box paddingX={2}>
                                        {ownsReply && (
                                          <DeleteReply
                                            replyId={reply.id}
                                            refetch={refetch}
                                            ownsReply={ownsReply}
                                          />
                                        )}
                                      </Box>
                                    </Box>
                                    <Box paddingX={3} paddingY={1}>
                                      <Text
                                        color='orange'
                                        key={reply.id}
                                        size='sm'
                                        bold
                                      >
                                        {reply.body}
                                      </Text>
                                      <Box
                                        direction='row'
                                        alignItems='center'
                                        display='flex'
                                      >
                                        <Box>
                                          <Text color='gray' italic size='xs'>
                                            {format(
                                              post.node.createdAt,
                                              'MMM d, YYYY',
                                              {
                                                awareOfUnicodeTokens: true
                                              }
                                            )}
                                          </Text>
                                        </Box>
                                        <Box>
                                          <Reply
                                            postId={post.node.id}
                                            refetch={refetch}
                                          />
                                        </Box>
                                        <Box>
                                          <EditReply
                                            replyId={reply.id}
                                            refetch={refetch}
                                            reply={reply.body}
                                            ownsReply={ownsReply}
                                          />
                                        </Box>
                                        <Box paddingX={1}>
                                          <IconButton icon='heart' size='xs' />
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                        );
                      })}

                      {/* Toggle text area for creating new posts */}

                      <Box
                        justifyContent='between'
                        alignItems='stretch'
                        direction='column'
                        display='flex'
                        wrap
                        padding={2}
                      >
                        {/* Load more comments button */}
                        <Box display='flex' justifyContent='end' padding={1}>
                          <Touchable
                            onTouch={e =>
                              this.getMoreComments(e, fetchMore, data, tankId)
                            }
                          >
                            <Text bold color='gray' size='sm'>
                              {hasMoreComments ? 'More Commments' : null}
                            </Text>
                          </Touchable>
                        </Box>
                        <Box alignItems='center' display='flex' flex='grow'>
                          <div
                            style={{ display: 'inline-block' }}
                            ref={c => {
                              this.anchor = c;
                            }}
                          >
                            <IconButton
                              icon='speech-ellipsis'
                              size='xl'
                              onClick={this.handleClick}
                            />
                          </div>
                        </Box>

                        {this.state.open && (
                          <Layer>
                            <Flyout
                              anchor={this.anchor}
                              idealDirection='up'
                              onDismiss={this.handleDismiss}
                              size='xl'
                              color='darkGray'
                            >
                              <Box
                                padding={1}
                                flex='grow'
                                alignContent='center'
                                dangerouslySetInlineStyle={{
                                  __style: {
                                    zIndex: 50
                                  }
                                }}
                              >
                                <form
                                  onKeyDown={e =>
                                    this.createTankComment(
                                      e,
                                      createTankPost,
                                      tankId,
                                      refetch
                                    )
                                  }
                                >
                                  <TextArea
                                    id='comment'
                                    onChange={this.handleChange}
                                    placeholder={this.state.value}
                                    value={this.state.value}
                                    errorMessage={
                                      this.state.value.length >= 100
                                        ? 'Please limit texts to 100 characters '
                                        : null
                                    }
                                  />
                                </form>
                              </Box>
                            </Flyout>
                          </Layer>
                        )}
                      </Box>
                    </Box>
                  </React.Fragment>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Comments;
