import React, { Component } from 'react';
import { Box, IconButton, Sticky, Text, Avatar } from 'gestalt';
import ProfileMenu from './ProfileMenu';
import AddNewTank from './tank/AddNewTank';

class Profile extends Component {
  render() {
    const { session } = this.props;
    if (!session) return <p>Please create a profile</p>;

    const { me } = session;
    console.log(me);
    return (
      <React.Fragment>
        <Sticky top={0} dangerouslySetZIndex={{ __zIndex: 2 }}>
          <Box
            display='flex' 
            height={90}
            padding={5}
            shape='square'
            color='white'
            justifyContent='around'
            marginBottom={1}
          >
            <Box display='flex' direction='row'>
              <Box paddingX={1}>
                <Avatar name={me.name} size='md' src='/assets/scott.jpg' />
              </Box>
              <Box paddingX={1}>
                <Text bold>{me.name}</Text>
                <Text>30 followers - 44 following</Text>
              </Box>
            </Box>

            <Box
              color='white'
              shape='rounded'
              padding={3}
              display='flex'
              direction='row'
              alignItems='center'
              justifyContent='center'
            >
              <Box paddingX={2} flex='grow'>
                <AddNewTank profileId={me.profile.id} />
              </Box>
              <Box paddingX={2} flex='grow'>
                <IconButton
                  accessibilityLabel='camera'
                  icon='camera'
                  size='lg'
                />
              </Box>

              <Box paddingX={2} flex='grow'>
                <IconButton
                  accessibilityLabel='speech-ellipsis'
                  icon='speech-ellipsis'
                  size='lg'
                />
              </Box>
            </Box>
          </Box>
        </Sticky>
        <ProfileMenu profileId={me.profile.id} />
      </React.Fragment>
    );
  }
}

export default Profile;
