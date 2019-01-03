import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CREATE_TANK_MUTATION } from '../../queries/index';
import { GET_CURRENT_USER_PROFILE } from '../../queries/index';
import {
  Box,
  IconButton,
  Flyout,
  Text,
  Button,
  Heading,
  TextField,
  Label,
  Divider,
  Layer,
  Toast
} from 'gestalt';

class AddNewTank extends Component {
  state = {
    open: false,
    title: '',
    showGuideToast: false
  };

  handleClick = () => {
    this.setState(() => ({ open: !this.state.open }));
  };
  handleDismiss = e => {
    this.setState(() => ({ open: false }));
  };
  handleChange = ({ event }) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  createTankOnKeyPress = async ({ event }, createTankMutation) => {
    if (event.key == 'Enter') {
      const newTank = await createTankMutation({
        variables: {
          title: this.state.title,
          profileId: this.props.profileId
        }
      });

      this.setState({ open: false, showGuideToast: true });
      setTimeout(() => {
        this.setState({ showGuideToast: false });
      }, 4000);
    }
  };

  createTankOnClick = async (e, createTankMutation) => {
    const newTank = await createTankMutation({
      variables: {
        title: this.state.title,
        profileId: this.props.profileId
      }
    });

    this.setState({ open: false, showGuideToast: true });
    setTimeout(() => {
      this.setState({ showGuideToast: false });
    }, 4000);
  };

  render() {
    const { profileId } = this.props;

    return (
      <Mutation
        mutation={CREATE_TANK_MUTATION}
        refetchQueries={[
          {
            query: GET_CURRENT_USER_PROFILE,
            variables: { id: profileId }
          }
        ]}
      >
        {(createTank, { loading, error }) => {
          return (
            <React.Fragment>
              <Box alignContent='center'>
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
                    icon='add'
                    size='lg'
                  />
                </div>
                {this.state.open && (
                  <Flyout
                    anchor={this.anchor}
                    idealDirection='up'
                    onDismiss={this.handleDismiss}
                    size='md'
                  >
                    <Box marginBottom={4} padding={4} alignContent='center'>
                      <Heading bold align='center' size='sm'>
                        Add New Tank
                      </Heading>
                      <Divider />
                      <Box paddingY={1}>
                        <Label htmlFor='title'>
                          <Text bold>Title</Text>
                        </Label>
                      </Box>

                      <TextField
                        id='title'
                        errorMessage={
                          !this.state.title
                            ? "This field can't be blank!"
                            : null
                        }
                        name='title'
                        value={this.state.title}
                        placeholder='ex."SPS Dominated Reef"'
                        type='text'
                        onChange={this.handleChange}
                        onKeyDown={e =>
                          this.createTankOnKeyPress(e, createTank)
                        }
                      />
                      <Box paddingX={2} marginTop={3}>
                        <Button
                          color='blue'
                          text='Add'
                          disabled={!this.state.title}
                          onClick={e => this.createTankOnClick(e, createTank)}
                        />
                      </Box>
                    </Box>
                  </Flyout>
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
                      icon='check'
                      text='Tank profile added'
                      color='green'
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

export default AddNewTank;
