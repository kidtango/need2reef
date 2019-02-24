import React, { Component } from 'react';
import { adopt } from 'react-adopt';
import { Mutation } from 'react-apollo';
import SmallerSpinner from '../../spinner/SmallerSpinner';
import { Box, IconButton, Flyout, Button } from 'gestalt';
import { DELETE_TANK_REPLY_MUTATION } from '../../graphql/mutations';

const Composed = adopt({
  deleteTankReply: ({ render }) => (
    <Mutation mutation={DELETE_TANK_REPLY_MUTATION}>{render}</Mutation>
  )
});

class DeleteReply extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleDismiss = () => {
    this.setState({ open: false });
  };

  onHandleClick = async (e, deleteTankReplyMutation) => {
    await deleteTankReplyMutation({
      variables: {
        id: this.props.replyId
      }
    });

    this.setState({ open: false });

    // Refetch comments and update UI
    await this.props.refetch();
  };

  render() {
    return (
      <Composed>
        {({ deleteTankReply, loading, error }) => {
          if (loading)
            return (
              <Box alignContent='center'>
                <SmallerSpinner />
              </Box>
            );
          return (
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
                      size='sm'
                      onClick={e => this.onHandleClick(e, deleteTankReply)}
                    />
                  </Box>
                </Flyout>
              )}
            </Box>
          );
        }}
      </Composed>
    );
  }
}

export default DeleteReply;
