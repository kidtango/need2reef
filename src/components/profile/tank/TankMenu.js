import React from 'react';
import { Tabs, Box } from 'gestalt';
import Comments from './Comments';

class TankMenu extends React.Component {
  state = {
    activeIndex: 0
  };

  handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    this.setState({
      activeIndex: activeTabIndex
    });
  };
  render() {
    const { tank } = this.props;
    if (!tank) return <p>Error</p>;
    return (
      <Box marginTop={2}>
        <Tabs
        
          tabs={[
            {
              text: 'Equipment'
            },
            {
              text: `${
                tank.posts.length > 1
                  ? `${tank.posts.length} comments`
                  : `${tank.posts.length} comment`
              }`
            },
            {
              text: 'Water Parameters'
            }
          ]}
          activeTabIndex={this.state.activeIndex}
          onChange={this.handleChange}
        />
        <Box padding={2}>
          {this.state.activeIndex === 1 && <Comments comments={tank.posts} />}
        </Box>
      </Box>
    );
  }
}

export default TankMenu;
