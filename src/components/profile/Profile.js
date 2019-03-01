import React, { Component } from 'react';
import { Box, IconButton, Sticky, Text, Avatar } from 'gestalt';
import ProfileMenu from './ProfileMenu';
import AddNewTank from './tank/AddNewTank';
import PersonalMenuBar from '../navbar/PersonalMenuBar';

class Profile extends Component {
  render() {
    const { profileId } = this.props.match.params;
    if (!profileId) return <p>Please create a profile</p>;

    return (
      <React.Fragment>
        {/* <Sticky top={0} dangerouslySetZIndex={{ __zIndex: 2 }}>
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
              <Box paddingX={1} width={50}>
                <Avatar
                  name={me.name}
                  size='md'
                  src={me.profilePicture[0].picture}
                />
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
        </Sticky> */}
        <PersonalMenuBar />
        <ProfileMenu profileId={profileId} />
      </React.Fragment>
    );
  }
}

export default Profile;
