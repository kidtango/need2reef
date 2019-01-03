import React, { Component } from 'react';
import { Box, Tabs, Text, Container } from 'gestalt';
import Discussions from './Discussions';
import Aquariums from './tank/Aquariums';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER_PROFILE } from '../queries/index';
import Spinner from '../Spinner';

class ProfileMenu extends Component {
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
    if (!this.props.profileId) return <p>error</p>;
    return (
      <Query
        query={GET_CURRENT_USER_PROFILE}
        variables={{ id: this.props.profileId }}
      >
        {({ data, loading, error, refetch }) => {
          if (error) return <p>Error</p>;

          if (loading) return <Spinner />;
          // console.log('data: ', data);
          return (
            <Container>
              <Tabs
                tabs={[
                  {
                    text: 'Aquariums'
                  },
                  {
                    text: 'Corals For Sale'
                  },
                  {
                    text: 'Equipment For Sale'
                  }
                ]}
                activeTabIndex={this.state.activeIndex}
                onChange={this.handleChange}
              />

              {this.state.activeIndex === 0 && (
                <Container>
                  <Box marginTop={2} padding={5}>
                    <Aquariums profile={data.profile} />
                  </Box>
                </Container>
              )}

              {this.state.activeIndex === 1 && (
                <Container>
                  <Box marginTop={2} padding={5}>
                    <Text>Corals for sale</Text>
                  </Box>
                </Container>
              )}

              {this.state.activeIndex === 2 && (
                <Container>
                  <Discussions />
                </Container>
              )}
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default ProfileMenu;
