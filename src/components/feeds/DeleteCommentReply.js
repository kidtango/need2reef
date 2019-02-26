import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SmallerSpinner from '../spinner/SmallerSpinner';
import { Box, IconButton, Flyout, Button } from 'gestalt';
import { DELETE_FEED_COMMENT } from '../graphql/mutations';
import { GET_FEED_COMMENTS_QUERY } from '../graphql/queries';
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

  onHandleClick = async (e, deleteFeedComment) => {
    await deleteFeedComment({
      variables: {
        id: this.props.feedComment.id
      }
    });

    this.setState({ open: false });

    // Refetch comments and update UI
  };

  render() {
    const { feedComment, session } = this.props;
    // const ownsFeedComment = session.me.id === feedComment.author.id;

    return (
      <Mutation
        mutation={DELETE_FEED_COMMENT}
        refetchQueries={[
          {
            query: GET_FEED_COMMENTS_QUERY,
            variables: {
              id: this.props.feedId
            }
          }
        ]}
      >
        {(deleteFeedComment, { loading, error }) => {
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
                        disabled={!true}
                        size='sm'
                        onClick={e => this.onHandleClick(e, deleteFeedComment)}
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
