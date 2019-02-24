import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  Box,
  Masonry,
  Image,
  Collage,
  Mask,
  Card,
  Text,
  Touchable
} from 'gestalt';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  MORE_TANK_PROFILES_QUERY,
  GET_TANK_PROFILES_QUERY
} from '../graphql/queries';
import Spinner from '../spinner/Spinner';

class Profiles extends Component {
  state = {
    hasMoreProfile: true
  };

  getMoreItems = (e, fetchMore, tanksConnection) => {
    const cursor =
      tanksConnection.edges[tanksConnection.edges.length - 1].node.id;

    fetchMore({
      query: MORE_TANK_PROFILES_QUERY,
      variables: { cursor: cursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.tanksConnection.pageInfo.hasNextPage) {
          this.setState({
            hasMoreProfile: fetchMoreResult.tanksConnection.pageInfo.hasNextPage
          });
        }

        const previousProfiles = previousResult.tanksConnection.edges;

        const newProfiles = fetchMoreResult.tanksConnection.edges;

        return {
          tanksConnection: {
            __typename: previousResult.tanksConnection.__typename,
            edges: [...previousProfiles, ...newProfiles]
          }
        };
      }
    });
  };

  render() {
    return (
      <Query query={GET_TANK_PROFILES_QUERY}>
        {({ data: { tanksConnection }, loading, fetchMore }) => {
          if (loading)
            return (
              <Box
                justifyContent='center'
                Box
                display='flex'
                alignSelf='center'
              >
                <Spinner />
              </Box>
            );

          return (
            <InfiniteScroll
              dataLength={tanksConnection.edges.length}
              next={e => this.getMoreItems(e, fetchMore, tanksConnection)}
              hasMore={this.state.hasMoreProfile}
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
              <Box
                padding={6}
                alignContent='center'
                justifyContent='center'
                paddingX={10}
              >
                <Masonry
                  flexible
                  minCols={1}
                  columnWidth={200}
                  gutterWidth={10}
                  items={tanksConnection.edges}
                  comp={({ data }) => {
                    return (
                      <Box
                        justifyContent='center'
                        display='flex'
                        key={data.node.id}
                        wrap
                        width={210}
                        padding={1}
                      >
                        <Touchable>
                          <Card>
                            <Collage
                              columns={3}
                              cover
                              width={200}
                              height={200}
                              gutter={1}
                              renderImage={({ index, width, height }) => {
                                const coverImage = {
                                  color: '#000',
                                  naturalHeight: 150,
                                  naturalWidth: 150,
                                  src: `${data.node.images[
                                    data.node.images.length - 1
                                  ] &&
                                    data.node.images[
                                      data.node.images.length - 1
                                    ].url}`
                                };
                                const nonCoverImages = [
                                  {
                                    color: 'rgb(111, 91, 77)',
                                    naturalHeight: 100,
                                    naturalWidth: 100,
                                    src: `${data.node.images[0] &&
                                      data.node.images[0].url}`
                                  },
                                  {
                                    color: 'rgb(231, 186, 176)',
                                    naturalHeight: 50,
                                    naturalWidth: 40,
                                    src: `${data.node.images[1] &&
                                      data.node.images[1].url}`
                                  }
                                ];
                                const image =
                                  index === 0
                                    ? coverImage
                                    : nonCoverImages[index - 1];
                                return (
                                  <Mask
                                    width={width}
                                    height={height}
                                    shape='rounded'
                                  >
                                    <Image
                                      alt='cover image'
                                      src={image.src}
                                      color={image.color}
                                      naturalHeight={image.naturalHeight}
                                      naturalWidth={image.naturalWidth}
                                      fit='cover'
                                    />
                                  </Mask>
                                );
                              }}
                            />
                            <Box alignItems='center' display='flex' flex='grow'>
                              <Text bold size='lg'>
                                {data.node.title}
                              </Text>
                            </Box>
                          </Card>
                        </Touchable>
                      </Box>
                    );
                  }}
                />
              </Box>
            </InfiniteScroll>
          );
        }}
      </Query>
    );
  }
}

export default Profiles;
