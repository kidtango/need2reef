import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SmallerSpinner from '../../spinner/SmallerSpinner';
import { Box, IconButton, Flyout, Layer, TextArea } from 'gestalt';
import { UPDATE_TANK_REPLY_MUTATION } from '../../graphql/mutations';

class EditReply extends Component {
  state = {
    open: false,
    editedReply: ''
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open,
      editedReply: this.props.reply
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

  updateTankReply = async (e, updateTankReplyMutation, replyId, refetch) => {
    if (e.key === 'Enter') {
      await updateTankReplyMutation({
        variables: {
          body: this.state.editedReply,
          replyId
        }
      });
      this.setState({ open: false });

      await refetch();
    }
  };

  render() {
    const { replyId, refetch } = this.props;
    return (
      <Mutation mutation={UPDATE_TANK_REPLY_MUTATION}>
        {(updateTankReply, { loading, error }) => {
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
                {this.props.ownsReply ? (
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
                          this.updateTankReply(
                            e,
                            updateTankReply,
                            replyId,
                            refetch
                          )
                        }
                      >
                        <TextArea
                          id='editedReply'
                          onChange={this.handleChange}
                          value={this.state.editedReply}
                          defaultValue={this.props.comment}
                          name='editedReply'
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

export default EditReply;
