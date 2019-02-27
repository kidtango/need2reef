import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SmallerSpinner from '../spinner/SmallerSpinner';
import { Box, IconButton, Flyout, Button } from 'gestalt';
import { DELETE_FEED_COMMENT_REPLY } from '../graphql/mutations';
import { GET_FEED_COMMENT_REPLIES } from '../graphql/queries';
import withSession from '../withSession';

class DeleteCommentReply extends Component {
  state = {
    open: false,
    showTextArea: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  toggleTextArea = () => {
    this.setState({ showTextArea: !this.state.showTextArea });
  };

  handleDismiss = () => {
    this.setState({ open: false });
  };

  onHandleClick = async (e, deleteFeedCommentReply, reply) => {
    await deleteFeedCommentReply({
      variables: {
        replyId: reply.id
      }
    });

    this.setState({ open: false, value: '' });

    // Refetch comments and update UI
  };

  render() {
    const { reply, session, feedComment } = this.props;

    const ownsFeedCommentReply = session.me.id === reply.author.id;

    return (
      <Mutation
        mutation={DELETE_FEED_COMMENT_REPLY}
        refetchQueries={[
          {
            query: GET_FEED_COMMENT_REPLIES,
            variables: {
              commentId: feedComment.id
            }
          }
        ]}
      >
        {(deleteFeedCommentReply, { loading, error }) => {
          if (error) return <p>Something went wrong!!!</p>;
          if (loading)
            return (
              <Box alignContent='center'>
                <SmallerSpinner />
              </Box>
            );
          return (
            <React.Fragment>
              <Box>
                <Box display='inlineBlock'>
                  <div
                    style={{ display: 'inline-block' }}
                    ref={c => {
                      this.anchor = c;
                    }}
                  >
                    <IconButton
                      accessibilityExpanded={!!this.state.open}
                      accessibilityHaspopup
                      onClick={this.handleClick}
                      icon='ellipsis'
                      size='sm'
                    />
                  </div>
                </Box>
                {this.state.open && (
                  <Flyout
                    anchor={this.anchor}
                    idealDirection='down'
                    onDismiss={this.handleDismiss}
                    size='xs'
                  >
                    <Box
                      padding={1}
                      flex='grow'
                      alignContent='center'
                      dangerouslySetInlineStyle={{
                        __style: {
                          zIndex: 1
                        }
                      }}
                    >
                      <Button
                        color='white'
                        text='Delete'
                        disabled={!ownsFeedCommentReply}
                        size='sm'
                        onClick={e =>
                          this.onHandleClick(e, deleteFeedCommentReply, reply)
                        }
                      />
                    </Box>
                  </Flyout>
                )}
              </Box>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default withSession(DeleteCommentReply);
