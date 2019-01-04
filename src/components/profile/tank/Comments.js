import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { format } from 'date-fns';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  CREATE_TANK_COMMENT_MUTATION,
  GET_COMMENTS_QUERY
} from '../../queries/index';
import { Box, TextArea, IconButton, Text, Avatar, Masonry } from 'gestalt';
import Spinner from '../../spinner/Spinner';
import Reply from './Reply';

class Comments extends Component {
  state = {
    value: '',
    showTextArea: false
  };

  handleClick = () => {
    this.setState({ showTextArea: !this.state.showTextArea });
  };

  handleChange = ({ value }) => {
    this.setState({
      value
    });
  };

  createTankComment = async (e, createPostMutation, tankId, refetch) => {
    // On "Enter" keyDown, submit form
    if (e.key == 'Enter') {
      //Create new post
      const post = await createPostMutation({
        variables: {
          body: this.state.value,
          tankId
        }
      });
      //refetch comments
      await refetch();
      //close text area
      this.setState({ showTextArea: false });
    }
  };
  render() {
    const { tankId } = this.props;
    return (
      <Query query={GET_COMMENTS_QUERY} variables={{ id: tankId }}>
        {({ data, loading, error, refetch }) => {
          if (error) return <Text>uh ohhh... Something went wrong!</Text>;
          if (loading)
            return (
              <Box display='flex' justifyContent='center' padding={5}>
                <Spinner />
              </Box>
            );
          return (
            <Mutation mutation={CREATE_TANK_COMMENT_MUTATION}>
              {(createTankPost, { loading, error }) => {
                if (loading) return <Spinner />;
                if (error) return <Text>uh ohhh... Something went wrong!</Text>;
                return (
                  <Box
                    display='flex'
                    direction='column'
                    alignItems='start'
                    justifyContent='start'
                  >
                    {data.tankPosts.map(post => (
                      <Box>
                        <Box display='flex' alignItems='center'>
                          <Box paddingX={1} paddingY={3}>
                            <Avatar name={post.author.name} size='sm' />
                          </Box>
                          <Box paddingX={1}>
                            <Text bold size='xs' align='left'>
                              {post.author.name}
                            </Text>
                          </Box>
                        </Box>
                        <Box paddingX={2}>
                          <Text
                            align='left'
                            color='green'
                            key={post.id}
                            size='lg'
                          >
                            {post.body}
                          </Text>

                          <Box
                            direction='row'
                            alignItems='center'
                            display='flex'
                          >
                            <Box paddingX={1}>
                              <Text color='gray' italic size='xs'>
                                {format(post.createdAt, 'MMMM d, YYYY', {
                                  awareOfUnicodeTokens: true
                                })}
                              </Text>
                            </Box>
                            <Box paddingX={1}>
                              <Reply postId={post.id} refetch={refetch} />
                            </Box>
                            <Box paddingX={1}>
                              <IconButton icon='heart' size='sm' />
                            </Box>
                          </Box>
                        </Box>
                        {post.replies.map(reply => (
                          <Box paddingX={6}>
                            <Box
                              display='flex'
                              direction='row'
                              alignItems='center'
                              padding={1}
                            >
                              <Avatar name={reply.author.name} size='sm' />
                              <Box paddingX={1}>
                                <Text bold size='xs' key={reply.id}>
                                  {reply.author.name}
                                </Text>
                              </Box>
                            </Box>
                            <Box paddingX={2} paddingY={3}>
                              <Text color='orange' key={reply.id} size='lg'>
                                {reply.body}
                              </Text>

                              <Box
                                direction='row'
                                alignItems='center'
                                display='flex'
                              >
                                <Box paddingX={1}>
                                  <Text color='gray' italic size='xs'>
                                    {format(post.createdAt, 'MMMM d, YYYY', {
                                      awareOfUnicodeTokens: true
                                    })}
                                  </Text>
                                </Box>
                                <Box paddingX={1}>
                                  <Reply postId={post.id} refetch={refetch} />
                                </Box>
                                <Box paddingX={1}>
                                  <IconButton icon='heart' size='sm' />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ))}

                    {/* Toggle text area for creating new posts */}
                    <Box>
                      <IconButton
                        icon='speech-ellipsis'
                        size='xl'
                        onClick={this.handleClick}
                      />

                      <Box>
                        {this.state.showTextArea && (
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
                              id='discussions'
                              onChange={this.handleChange}
                              placeholder='Start a discussion with me... Hit Enter to submit'
                              value={this.state.value}
                            />
                          </form>
                        )}
                      </Box>
                    </Box>
                  </Box>
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
