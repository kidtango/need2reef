import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SmallerSpinner from '../../spinner/SmallerSpinner';
import { CREATE_TANK_IMAGE_MUTATION } from '../../graphql/mutations';
import { GET_CURRENT_USER_PROFILE } from '../../graphql/queries';

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

class AddImages extends Component {
  state = {
    open: false,
    files: [],
    showGuideToast: false
  };

  handleClick = () => {
    this.setState(() => ({ open: !this.state.open }));
  };
  handleDismiss = e => {
    this.setState(() => ({ open: false }));
  };
  handleChange = ({ event }) => {
    // console.log(e.target.files[0]);
    let files = [];
    files.push(event.target.files[0]);
    console.log('TCL: AddImages -> handleChange -> files', files);
    this.setState({
      files
    });
  };

  addImage = async (e, createTankImageMutation) => {
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
        tankId: this.props.tankId,
        url: image.secure_url
      }
    });

    this.setState({ files: [] });
  };

  render() {
    const { profileId } = this.props;

    return (
      <Mutation
        mutation={CREATE_TANK_IMAGE_MUTATION}
        refetchQueries={[
          {
            query: GET_CURRENT_USER_PROFILE,
            variables: { id: profileId }
          }
        ]}
      >
        {(createTankImage, { loading, error }) => {
          if (loading)
            return (
              <Box alignContent='center'>
                <SmallerSpinner />
              </Box>
            );
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
                    accessibilityLabel='add image'
                    accessibilityHaspopup
                    onClick={this.handleClick}
                    icon='camera-roll'
                    size='md'
                    iconColor='blue'
                  />
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
                        Add new photos
                      </Heading>
                      <Divider />
                      <Box paddingY={1}>
                        <Label htmlFor='title'>
                          <Text bold>Photo</Text>
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
                          onClick={e => this.addImage(e, createTankImage)}
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

export default AddImages;
