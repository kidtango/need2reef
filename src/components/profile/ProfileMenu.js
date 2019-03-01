import React, { Component } from 'react';
import { Box, Tabs, Text, Container } from 'gestalt';
import Discussions from './Discussions';
import Aquariums from './tank/Aquariums';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER_PROFILE } from '../graphql/queries';
import Spinner from '../spinner/Spinner';
import withSession from '../withSession';

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
    const { session } = this.props;
    if (!session) return <p>error</p>;
    return (
      <Query
        query={GET_CURRENT_USER_PROFILE}
        variables={{ id: this.props.profileId }}
      >
        {({ data, loading, error }) => {
          if (error) return <p>Error</p>;
          if (loading) return <Spinner />;

          const name = data.profile.author.name;

          return (
            <Container>
              <Box marginLeft={10}>
                <Tabs
                  tabs={[
                    {
                      text: name + "'s " + ' Aquariums'
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
              </Box>

              {this.state.activeIndex === 0 && (
                <Container>
                  <Box marginTop={2} padding={5}>
                    <Aquariums profile={data.profile} session={session} />
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

export default withSession(ProfileMenu);
