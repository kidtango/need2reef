import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Avatar, Touchable } from 'gestalt';

const AvatarMedium = ({ name, picture, profileId }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      direction='row'
      alignContent='center'
      paddingY={1}
    >
      <Link to={`/profile/${profileId}`}>
        <Touchable>
          <Box>
            <Avatar name={name} size='md' src={picture} />
          </Box>
        </Touchable>
      </Link>
      <Link to={`/profile/${profileId}`}>
        <Touchable shape='pill' onMouseEnter>
          <Box paddingX={1} direction='row'>
            <Text bold size='sm'>
              {name}
            </Text>
          </Box>
        </Touchable>
      </Link>
    </Box>
  );
};

export default AvatarMedium;
