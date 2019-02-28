import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import SmallerSpinner from '../spinner/SmallerSpinner';
import { Box, IconButton, Flyout, Button } from 'gestalt';
import { DELETE_FEED_MUTATION } from '../graphql/mutations';
import { GET_FEEDS_QUERY } from '../graphql/queries';
import withSession from '../withSession';

class DeleteFeed extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleDismiss = () => {
    this.setState({ open: false });
  };

  onHandleClick = async (e, deleteFeed) => {
    const feedId = this.props.feed.node.id;
    await deleteFeed({
      variables: {
        id: feedId
      }
    });

    await this.props.resetHasMoreFeeds();

    this.setState({ open: false });
  };

  render() {
    const { feed } = this.props;
    const { session } = this.props;

    const ownsFeed = session.me.id === feed.node.author.id;

    return (
      <Mutation
        mutation={DELETE_FEED_MUTATION}
        refetchQueries={[
          {
            query: GET_FEEDS_QUERY
          }
        ]}
      >
        {(deleteFeed, { loading, error }) => {
          if (loading)
            return (
              <Box alignContent='center'>
                <SmallerSpinner />
              </Box>
            );
          return (
            <Box>
              <Box display='inlineBlock'>
                <div
                  style={{ display: 'inline-block' }}
                  ref={c => {
                    this.anchor = c;
                  }}
                >
                  <IconButton
                    accessibilityExpanded={!!this.state.open}
                    accessibilityHaspopup
                    onClick={this.handleClick}
                    icon='ellipsis'
                    size='xl'
                  />
                </div>
              </Box>
              {this.state.open && (
                <Flyout
                  anchor={this.anchor}
                  idealDirection='down'
                  onDismiss={this.handleDismiss}
                  size='xs'
                >
                  <Box
                    padding={1}
                    flex='grow'
                    alignContent='center'
                    dangerouslySetInlineStyle={{
                      __style: {
                        zIndex: 1
                      }
                    }}
                  >
                    <Button
                      color='white'
                      text='Delete'
                      size='sm'
                      disabled={!ownsFeed}
                      onClick={e => this.onHandleClick(e, deleteFeed)}
                    />
                  </Box>
                </Flyout>
              )}
            </Box>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteFeed;
