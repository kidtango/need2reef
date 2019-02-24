import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SmallerSpinner from '../../spinner/SmallerSpinner';
import { Box, IconButton, Flyout, Layer, TextArea } from 'gestalt';
import { UPDATE_TANK_POST_MUTATION } from '../../graphql/mutations';

class EditComment extends Component {
  state = {
    open: false,
    editedComment: ''
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open,
      editedComment: this.props.comment
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

  updateTankComment = async (e, updateTankPostMutation, postId, refetch) => {
    if (e.key === 'Enter') {
      await updateTankPostMutation({
        variables: {
          body: this.state.editedComment,
          postId
        }
      });
      this.setState({ open: false });

      await refetch();
    }
  };

  render() {
    const { postId, refetch } = this.props;
    return (
      <Mutation mutation={UPDATE_TANK_POST_MUTATION}>
        {(updateTankPost, { loading, error }) => {
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
                <IconButton
                  accessibilityExpanded={!!this.state.open}
                  accessibilityHaspopup
                  onClick={this.handleClick}
                  icon='edit'
                  size='xs'
                />
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
                            updateTankPost,
                            postId,
                            refetch
                          )
                        }
                      >
                        <TextArea
                          id='editedComment'
                          onChange={this.handleChange}
                          value={this.state.editedComment}
                          defaultValue={this.props.comment}
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
