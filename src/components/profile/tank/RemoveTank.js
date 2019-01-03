import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Box, Flyout, Text, Button, IconButton, Layer, Toast } from 'gestalt';
import { DELETE_TANK_MUTATION } from '../../queries/index';
import { GET_CURRENT_USER_PROFILE } from '../../queries/index';
import confirmationToast from '../../toastMessage/confirmationToast';

class RemoveTank extends Component {
  state = {
    open: false,
    showGuideToast: false
  };

  handleClick = () => {
    this.setState(() => ({ open: !this.state.open }));
  };
  handleDismiss = () => {
    this.setState(() => ({ open: false }));
  };
  deleteTank = async (e, deleteTankMutation) => {
    await deleteTankMutation();
    this.setState({
      showGuideToast: true
    });
  };

  render() {
    const { profileId, tankId } = this.props;

    return (
      <Mutation
        mutation={DELETE_TANK_MUTATION}
        variables={{ id: tankId }}
        refetchQueries={[
          {
            query: GET_CURRENT_USER_PROFILE,
            variables: { id: profileId }
          }
        ]}
      >
        {(deleteTank, { loading, error }) => {
          return (
            <React.Fragment>
              <Box>
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
                    icon='cancel'
                    size='md'
                    iconColor='red'
                  />
                </div>
                {this.state.open && (
                  <Layer>
                    <Flyout
                      anchor={this.anchor}
                      idealDirection='down'
                      onDismiss={this.handleDismiss}
                      size='md'
                    >
                      <Box padding={3} marginBottom={4}>
                        <Text bold align='center'>
                          Are you sure you want to delete this tank profile?
                        </Text>
                        <Box paddingX={2} marginTop={3}>
                          <Button
                            color='red'
                            text='Remove Tank'
                            onClick={e => this.deleteTank(e, deleteTank)}
                          />
                        </Box>
                      </Box>
                    </Flyout>
                  </Layer>
                )}
              </Box>
              <Layer>
                <Box
                  fit
                  dangerouslySetInlineStyle={{
                    __style: {
                      bottom: 150,
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }
                  }}
                  paddingX={1}
                  position='fixed'
                >
                  {this.state.showGuideToast ? (
                    <Toast
                      icon='cancel'
                      text='Tank Profile Removed'
                      color='red'
                    />
                  ) : null}
                </Box>
              </Layer>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default RemoveTank;
