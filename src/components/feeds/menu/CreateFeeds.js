import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_NEW_FEED_MUTATION } from '../../graphql/mutations';
import { GET_FEEDS_QUERY } from '../../graphql/queries';
import {
  Box,
  IconButton,
  Flyout,
  Text,
  Button,
  Heading,
  TextArea,
  Label,
  Divider,
  Layer,
  Toast,
  TextField
} from 'gestalt';
import Spinner from '../../spinner/SmallerSpinner';

class CreateFeeds extends Component {
  state = {
    open: false,
    message: '',
    files: []
  };

  handleClick = () => {
    this.setState(() => ({ open: !this.state.open }));
  };
  handleDismiss = e => {
    this.setState(() => ({ open: false }));
  };
  handleFileChange = ({ event }) => {
    let files = [];
    files.push(event.target.files[0]);
    console.log('TCL: CreateFeeds -> handleChange -> files', files[0]);

    this.setState({
      files
    });
  };

  handleChange = ({ event }) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  createFeedOnKeyPress = async ({ event }, createFeed) => {
    if (event.key === 'Enter') {
      const { files, message } = this.state;

      // Saving image file to cloudinary
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

      await createFeed({
        variables: {
          url: image.secure_url,
          message
        }
      });

      this.setState({
        open: false,
        message: '',
        files: []
      });
    }
  };

  createTankOnClick = async (e, createFeed) => {
    const { files, message } = this.state;

    // Saving image file to cloudinary
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
    console.log('TCL: createFeedOnKeyPress -> image', image.secure_url);

    await createFeed({
      variables: {
        url: image.secure_url,
        message
      }
    });

    this.setState({
      open: false,
      message: '',
      files: []
    });
  };

  render() {
    const { userId } = this.props;

    return (
      <Mutation
        mutation={CREATE_NEW_FEED_MUTATION}
        refetchQueries={[
          {
            query: GET_FEEDS_QUERY
          }
        ]}
      >
        {(createFeed, { loading, error }) => {
          if (error) return <p>Something went wrong!</p>;
          if (loading)
            return (
              <Box alignContent='center'>
                <Spinner />
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
                    accessibilityLabel='add'
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
                    size='xl'
                  >
                    <Box marginBottom={1} padding={1} flex='grow'>
                      <Heading bold align='center' size='sm'>
                        Create Feeds
                      </Heading>
                      <Divider />
                      <Box paddingY={1}>
                        <Label htmlFor='title'>
                          <Text bold>Message</Text>
                        </Label>
                      </Box>

                      <TextArea
                        id='message'
                        errorMessage={
                          !this.state.message
                            ? "This field can't be blank!"
                            : null
                        }
                        name='message'
                        value={this.state.message}
                        placeholder="What's on your mind?"
                        type='text'
                        onChange={this.handleChange}
                        onKeyDown={e =>
                          this.createFeedOnKeyPress(e, createFeed, userId)
                        }
                      />
                      <Box paddingY={1}>
                        <Label htmlFor='title'>
                          <Text bold>Upload a photo</Text>
                        </Label>
                      </Box>
                      <TextField
                        id='files'
                        errorMessage={
                          !this.state.files
                            ? "This field can't be blank!"
                            : null
                        }
                        name='files'
                        value={this.state.file}
                        placeholder='Upload an image'
                        type='file'
                        onChange={this.handleFileChange}
                      />
                      <Box paddingX={2} marginTop={3}>
                        <Button
                          color='blue'
                          text='Create'
                          disabled={!this.state.files[0] || !this.state.message}
                          onClick={e =>
                            this.createTankOnClick(e, createFeed, userId)
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

export default CreateFeeds;
