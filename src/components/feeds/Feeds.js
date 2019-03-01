import React, { Component } from 'react';
import { Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Text, Avatar, Container, Mask, Touchable } from 'gestalt';
import { GET_FEEDS_QUERY } from '../graphql/queries';
import { GET_MORE_FEEDS_QUERY } from '../graphql/queries';
import Spinner from '../spinner/Spinner';
import CreateComments from './CreateComments';
import PersonalMenuBar from '../navbar/PersonalMenuBar';
import DeleteFeed from './DeleteFeed';
import Comments from './Comments';
import withSession from '../withSession';
import AvatarMedium from '../avatars/AvatarMedium';

class Feeds extends Component {
  state = {
    hasMoreFeeds: true
  };

  getMoreItems = (e, fetchMore, feedsConnection) => {
    const cursor =
      feedsConnection.edges[feedsConnection.edges.length - 1].node.id;

    fetchMore({
      query: GET_MORE_FEEDS_QUERY,
      variables: { cursor: cursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.feedsConnection.pageInfo.hasNextPage) {
          this.setState({
            hasMoreFeeds: fetchMoreResult.feedsConnection.pageInfo.hasNextPage
          });
        }

        const previousFeeds = previousResult.feedsConnection.edges;

        const newFeeds = fetchMoreResult.feedsConnection.edges;

        return {
          feedsConnection: {
            __typename: previousResult.feedsConnection.__typename,
            edges: [...previousFeeds, ...newFeeds]
          }
        };
      }
    });
  };

  resetHasMoreFeeds = () => {
    this.setState({
      hasMoreFeeds: true
    });
  };

  render() {
    const { session } = this.props;
    return (
      <Query query={GET_FEEDS_QUERY}>
        {({ data: { feedsConnection }, loading, error, fetchMore }) => {
          if (error) return <Text>uh ohhh... Something went wrong!</Text>;
          if (loading)
            return (
              <Box display='flex' justifyContent='center' padding={5}>
                <Spinner />
              </Box>
            );

          return (
            <React.Fragment>
              {/* menu */}
              <PersonalMenuBar resetHasMoreFeeds={this.resetHasMoreFeeds} />
              <InfiniteScroll
                dataLength={feedsConnection.edges.length}
                next={e => this.getMoreItems(e, fetchMore, feedsConnection)}
                hasMore={this.state.hasMoreFeeds}
                loader={
                  <Box
                    justifyContent='center'
                    alignContent='center'
                    display='flex'
                    alignSelf='center'
                    padding={10}
                  >
                    <Spinner />
                  </Box>
                }
              >
                <Container>
                  <Box
                    display='flex'
                    direction='column'
                    alignItems='stretch'
                    justifyContent='between'
                    wrap
                    padding={2}
                    fit={true}
                    flex='grow'
                  >
                    {feedsConnection.edges.map(feed => (
                      <Box
                        padding={3}
                        color='lightGray'
                        margin={5}
                        marginBottom={10}
                        shape='rounded'
                        maxWidth={700}
                      >
                        <Box
                          display='flex'
                          justifyContent='between'
                          alignItems='center'
                          position='relative'
                          direction='row'
                          wrap
                        >
                          <AvatarMedium
                            name={feed.node.author.name}
                            picture={feed.node.author.profilePicture[0].picture}
                            profileId={feed.node.author.profile.id}
                          />

                          <Box
                            direction='row'
                            justifyContent='start'
                            marginLeft={10}
                            dangerouslySetInlineStyle={{
                              __style: {
                                zIndex: 1
                              }
                            }}
                          >
                            {/* Delete Feed */}
                            <DeleteFeed
                              resetHasMoreFeeds={this.resetHasMoreFeeds}
                              feed={feed}
                              session={session}
                            />
                          </Box>
                        </Box>
                        <Box marginLeft={4} marginBottom={2}>
                          <Text align='left' color='green' size='lg' bold>
                            {feed.node.message}
                          </Text>
                        </Box>

                        <Box
                          padding={2}
                          justifyContent='center'
                          alignSelf='center'
                          shape='rounded'
                          marginBottom={2}
                          maxWidth={700}
                        >
                          <Mask shape='rounded'>
                            {feed.node.images[0] ? (
                              <img
                                style={{
                                  maxWidth: '100%',
                                  display: 'block'
                                }}
                                src={feed.node.images[0].url}
                              />
                            ) : (
                              <img
                                style={{ maxWidth: '100%', display: 'block' }}
                                src='/public/assets/tank1.jpg'
                              />
                            )}
                          </Mask>
                        </Box>
                        <Box paddingX={5}>
                          {/* Comment Section */}
                          <Comments feed={feed} />
                          {/* add new comments section*/}
                          <CreateComments feedId={feed.node.id} />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Container>
              </InfiniteScroll>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withSession(Feeds);
