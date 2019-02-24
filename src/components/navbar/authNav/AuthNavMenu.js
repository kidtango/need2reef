import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Button, Layer, IconButton, Flyout } from 'gestalt';
import { clearToken } from '../../../utils';

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

  logOut = () => {
    clearToken();

    this.setState({ open: false });

    this.props.history.push('/');
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
            accessibilityLabel='NavMenu'
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
                padding={1}
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
                <Box>
                  <Button text='Log out' color='blue' onClick={this.logOut} />
                </Box>
                <Box>
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

export default withRouter(AuthNavMenu);
