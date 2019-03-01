import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SmallerSpinner from '../spinner/SmallerSpinner';
import { UPDATE_PROFILE_PICTURE_MUTATION } from '../graphql/mutations';
import { GET_CURRENT_USER_PROFILE } from '../graphql/queries';

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
  Touchable,
  Avatar
} from 'gestalt';

class AddProfilePicture extends Component {
  state = {
    open: false,
    files: []
  };

  handleClick = () => {
    this.setState(() => ({ open: !this.state.open }));
    console.log('click');
  };
  handleDismiss = e => {
    this.setState(() => ({ open: false }));
  };
  handleChange = ({ event }) => {
    // console.log(e.target.files[0]);
    let files = [];
    files.push(event.target.files[0]);

    this.setState({
      files
    });
  };

  addImage = async (e, createTankImageMutation, profilePictureId) => {
    const { files } = this.state;

    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'tweef1');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/scotttang/image/upload',
      {
        method: 'POST',
        body: data
      }
    );
    const image = await res.json();

    // Store image to database

    await createTankImageMutation({
      variables: {
        profilePictureId,
        picture: image.secure_url
      }
    });

    this.setState({ files: [] });

    this.props.refetch();
  };

  render() {
    const { session } = this.props;

    const profilePictureId = session.me.profilePicture[0].id;

    return (
      <Mutation mutation={UPDATE_PROFILE_PICTURE_MUTATION} refetchQueries={[]}>
        {(updateProfilePicture, { loading, error }) => {
          if (loading)
            return (
              <Box alignContent='center'>
                <SmallerSpinner />
              </Box>
            );
          return (
            <React.Fragment>
              <Box display='flex' direction='row'>
                <div
                  style={{ display: 'inline-block' }}
                  ref={c => {
                    this.anchor = c;
                  }}
                >
                  <Box paddingX={1}>
                    <Touchable shape='pill' onTouch={this.handleClick}>
                      <Avatar
                        name={session.me.name}
                        size='md'
                        src={session.me.profilePicture[0].picture}
                      />
                    </Touchable>
                  </Box>
                </div>
                {this.state.open && (
                  <Flyout
                    anchor={this.anchor}
                    idealDirection='down'
                    onDismiss={this.handleDismiss}
                    size='md'
                  >
                    <Box marginBottom={4} padding={4} alignContent='center'>
                      <Heading bold align='center' size='xs'>
                        Add Profile Picture
                      </Heading>
                      <Divider />
                      <Box paddingY={1}>
                        <Label htmlFor='title'>
                          <Text bold>Upload a photo</Text>
                        </Label>
                      </Box>

                      <TextField
                        id='files'
                        name='files'
                        value={this.state.file}
                        placeholder='Upload an image'
                        type='file'
                        onChange={this.handleChange}
                      />
                      <Box paddingX={2} marginTop={3}>
                        <Button
                          color='blue'
                          text='Upload Image'
                          disabled={loading || !this.state.files[0]}
                          onClick={e =>
                            this.addImage(
                              e,
                              updateProfilePicture,
                              profilePictureId
                            )
                          }
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
                />
              </Layer>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default AddProfilePicture;
