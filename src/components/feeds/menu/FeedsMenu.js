import React from 'react';
import { Box, IconButton, Sticky, Text, Avatar } from 'gestalt';
import withSession from '../../withSession';
import CreateFeeds from './CreateFeeds';

const FeedsMenu = ({ session, refetch, resetHasMoreFeeds }) => {
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
          <Box paddingX={1}>
            <Avatar name={session.me.name} size='md' src='/assets/scott.jpg' />
          </Box>
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
            <IconButton accessibilityLabel='add' icon='add' size='lg' />
          </Box>
        </Box>
      </Box>
    </Sticky>
  );
};

export default withSession(FeedsMenu);
