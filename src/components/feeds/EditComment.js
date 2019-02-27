import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SmallerSpinner from '../spinner/SmallerSpinner';
import { Box, IconButton, Flyout, Layer, TextArea, Text } from 'gestalt';
import { UPDATE_FEED_COMMENT_MUTATION } from '../graphql/mutations';

class EditComment extends Component {
  state = {
    open: false,
    editedComment: ''
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open,
      editedComment: this.props.feedCommentBody
    });
  };

  handleDismiss = () => {
    this.setState({ open: false });
  };

  handleChange = ({ event }) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  updateTankComment = async (e, updateFeedComment, feedCommentId, refetch) => {
    if (e.key === 'Enter') {
      await updateFeedComment({
        variables: {
          body: this.state.editedComment,
          feedCommentId
        }
      });
      this.setState({ open: false });

      await refetch();
    }
  };

  render() {
    const { feedCommentBody, feedComment, refetch, session } = this.props;
    const feedCommentId = feedComment.id;

    // Check to see if user owns comment being edited
    const ownsComment = feedComment.author.id === session.me.id;

    return (
      <Mutation mutation={UPDATE_FEED_COMMENT_MUTATION}>
        {(updateFeedComment, { loading, error }) => {
          if (error) return <Text>Something went wrong!</Text>;
          if (loading)
            return (
              <Box alignContent='center'>
                <SmallerSpinner />
              </Box>
            );
          return (
            <React.Fragment>
              <div
                style={{ display: 'inline-block' }}
                ref={c => {
                  this.anchor = c;
                }}
              >
                {ownsComment ? (
                  <IconButton
                    accessibilityExpanded={!!this.state.open}
                    accessibilityHaspopup
                    onClick={this.handleClick}
                    icon='edit'
                    size='xs'
                  />
                ) : null}
              </div>

              {this.state.open && (
                <Layer>
                  <Flyout
                    anchor={this.anchor}
                    idealDirection='down'
                    onDismiss={this.handleDismiss}
                    size='md'
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
                          this.updateTankComment(
                            e,
                            updateFeedComment,
                            feedCommentId,
                            refetch
                          )
                        }
                      >
                        <TextArea
                          id='editedComment'
                          onChange={this.handleChange}
                          value={this.state.editedComment}
                          defaultValue={feedCommentBody}
                          name='editedComment'
                        />
                      </form>
                    </Box>
                  </Flyout>
                </Layer>
              )}
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default EditComment;
