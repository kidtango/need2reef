import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_FEED_COMMENT } from '../graphql/mutations';
import { GET_FEED_COMMENTS_QUERY } from '../graphql/queries';
import { Box, IconButton, Layer, Flyout, TextArea } from 'gestalt';
import SmallerSpinner from '../spinner/SmallerSpinner';

class CreateComments extends Component {
  state = {
    open: false,
    value: ''
  };

  handleDismiss = () => {
    this.setState({ open: !this.state.open });
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleChange = ({ value }) => {
    this.setState({
      value
    });
  };

  createFeedComment = async (e, createFeedComment) => {
    if (e.key === 'Enter') {
      // Create new comment for Feed
      await createFeedComment({
        variables: {
          body: this.state.value,
          feedId: this.props.feedId
        }
      });
    }
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_FEED_COMMENT}
        refetchQueries={[
          {
            query: GET_FEED_COMMENTS_QUERY,
            variables: {
              id: this.props.feedId
            }
          }
        ]}
      >
        {(createFeedComment, { loading, error }) => {
          if (error) console.log(error);
          if (loading) return <SmallerSpinner />;

          return (
            <Box
              justifyContent='between'
              alignItems='stretch'
              direction='column'
              display='flex'
              wrap
              padding={2}
            >
              <Box alignItems='center' display='flex' flex='grow'>
                <div
                  style={{ display: 'inline-block' }}
                  ref={c => {
                    this.anchor = c;
                  }}
                >
                  <IconButton
                    icon='speech-ellipsis'
                    size='xl'
                    onClick={this.handleClick}
                  />
                </div>
              </Box>

              {this.state.open && (
                <Layer>
                  <Flyout
                    anchor={this.anchor}
                    idealDirection='up'
                    onDismiss={this.handleDismiss}
                    size='xl'
                    color='darkGray'
                  >
                    <Box
                      padding={1}
                      flex='grow'
                      alignContent='center'
                      dangerouslySetInlineStyle={{
                        __style: {
                          zIndex: 50
                        }
                      }}
                    >
                      <form
                        onKeyDown={e =>
                          this.createFeedComment(e, createFeedComment)
                        }
                      >
                        <TextArea
                          id='feedcomment'
                          onChange={this.handleChange}
                          placeholder='Write a comment and hit enter to submit...'
                          value={this.state.value}
                          errorMessage={
                            this.state.value.length >= 100
                              ? 'Please limit texts to 100 characters '
                              : null
                          }
                        />
                      </form>
                    </Box>
                  </Flyout>
                </Layer>
              )}
            </Box>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateComments;
