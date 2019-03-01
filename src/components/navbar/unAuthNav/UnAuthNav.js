import React from 'react';
import {
  Box,
  Divider,
  SearchField,
  Heading,
  Image,
  IconButton,
  Sticky
} from 'gestalt';
import { NavLink } from 'react-router-dom';
import UnAuthNavMenu from './UnAuthNavMenu';

const UnAuthNav = ({ session }) => (
  <Sticky top={0}>
    <Box
      display='flex'
      alignItems='center'
      height={70}
      shape='square'
      color='white'
      justifyContent='between'
      direction='row'
      paddingX={5}
    >
      {/* Title and Logo */}
      <NavLink to='/'>
        <Box display='flex' alignItems='center'>
          {/* <Box height={50} width={50} margin={1}>
            <Image
              src='./icons/logo.png'
              alt='TheCoralStore'
              naturalHeight={1}
              naturalWidth={1}
            />
          </Box>{' '} */}
          <Heading size='xs' color='blue'>
            Tweef.io
          </Heading>
        </Box>{' '}
      </NavLink>
      {/* Search Field */}
      <Box
        color='white'
        shape='rounded'
        padding={3}
        display='flex'
        direction='row'
        alignItems='center'
        justifyContent='end'
      >
        <Box padding={3} />
        <Box flex='grow' paddingX={2}>
          <SearchField
            accessibilityLabel='Search'
            id='searchField'
            // onChange={({ value }) => this.setState({ value })}
            placeholder='Search'
            // value={this.state.value}
          />
        </Box>
        <Box paddingX={2}>
          <IconButton accessibilityLabel='people' icon='people' size='md' />
        </Box>
        <Box paddingX={2}>
          <IconButton icon='person' />
        </Box>
        <Box paddingX={2}>
          <IconButton accessibilityLabel='bell' icon='bell' size='md' />
        </Box>

        {/* Nav Menu */}
        <Box paddingX={2}>
          <UnAuthNavMenu />
        </Box>
      </Box>
    </Box>
    <Divider />
  </Sticky>
);

export default UnAuthNav;
