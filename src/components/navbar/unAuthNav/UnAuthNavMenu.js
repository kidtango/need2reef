import React from 'react';
import { Box, Button, Layer, IconButton, Flyout } from 'gestalt';
import Signup from '../../auth/Signup';
import Signin from '../../auth/Signin';

class AuthNavMenu extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleDismiss = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };
  render() {
    return (
      <Box>
        <div
          style={{ display: 'inline-block' }}
          ref={c => {
            this.anchor = c;
          }}
        >
          <IconButton
            accessibilityExpanded={!!this.state.open}
            accessibilityHaspopup
            icon='ellipsis'
            iconColor='gray'
            onClick={this.handleClick}
          />
        </div>
        {this.state.open && (
          <Layer>
            <Flyout
              anchor={this.anchor}
              idealDirection='down'
              size={250}
              // onDismiss={this.handleDismiss}
            >
              <Box
                padding={5}
                color='blue'
                alignContent='center'
                alignItems='center'
                alignSelf='center'
                flex='grow'
                dangerouslySetInlineStyle={{
                  __style: {
                    zIndex: 200
                  }
                }}
              >
                <Signin />
                <Signup />

                <Box marginTop={1}>
                  {' '}
                  <Button text='FAQ' color='blue' />
                </Box>
              </Box>
            </Flyout>
          </Layer>
        )}
      </Box>
    );
  }
}

export default AuthNavMenu;
