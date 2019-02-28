import React from 'react';
import { Box, IconButton, Sticky, Text, Avatar, Touchable } from 'gestalt';
import withSession from '../withSession';
import CreateFeeds from '../feeds/menu/CreateFeeds';
import AddNewTank from '../profile/tank/AddNewTank';
import AddProfilePicture from '../user_profile/AddProfilePicture';

const FeedsMenu = ({ session, refetch, resetHasMoreFeeds }) => {
  const handleClick = () => {};
  return (
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
          {/* <Box paddingX={1}>
            <Touchable onTouch={handleClick} shape='circle'>
              <Avatar
                name={session.me.name}
                size='md'
                src={session.me.profilePicture[0].picture}
              />
            </Touchable>
          </Box> */}

          <AddProfilePicture session={session} refetch={refetch} />

          <Box paddingX={1}>
            <Text bold>{session.me.name}</Text>
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
            <CreateFeeds
              userId={session.me.id}
              refetch={refetch}
              resetHasMoreFeeds={resetHasMoreFeeds}
            />
          </Box>

          <Box paddingX={2} flex='grow'>
            <IconButton accessibilityLabel='camera' icon='camera' size='lg' />
          </Box>

          <Box paddingX={2} flex='grow'>
            <AddNewTank profileId={session.me.profile.id} />
          </Box>
        </Box>
      </Box>
    </Sticky>
  );
};

export default withSession(FeedsMenu);
