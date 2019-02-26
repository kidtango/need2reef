import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_TANK_REPLY_MUTATION } from '../../graphql/mutations';
import { Box, TextArea, Text, Flyout, Layer, IconButton } from 'gestalt';
import SmallerSpinner from '../../spinner/SmallerSpinner';

class CreateReply extends Component {
  state = {
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

  createTankPostReply = async (e, PostReplyMutation, postId, refetch) => {
    if (e.key === 'Enter') {
      await PostReplyMutation({
        variables: {
          body: this.state.value,
          postId
        }
      });

      await refetch();
      this.setState({ open: false });
    }
  };

  render() {
    const { postId, refetch } = this.props;
    return (
      <Mutation mutation={CREATE_TANK_REPLY_MUTATION}>
        {(createTankReply, { loading, error }) => {
          if (error) return <Text>uh ohhh... Something went wrong!</Text>;
          if (loading) return <SmallerSpinner />;

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
                  icon='speech-ellipsis'
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
                          this.createTankPostReply(
                            e,
                            createTankReply,
                            postId,
                            refetch
                          )
                        }
                      >
                        <TextArea
                          id='discussions'
                          onChange={this.handleChange}
                          placeholder='Reply... Hit Enter to submit'
                          value={this.state.value}
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

export default CreateReply;
