import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  CREATE_TANK_REPLY_MUTATION,
  GET_COMMENTS_QUERY
} from '../../queries/index';
import { Box, TextArea, Text, Pog, IconButton } from 'gestalt';
import SmallerSpinner from '../../spinner/SmallerSpinner';

class Reply extends Component {
  state = {
    showTextArea: false
  };

  handleClick = () => {
    this.setState({ showTextArea: !this.state.showTextArea });
  };

  handleChange = ({ value }) => {
    this.setState({
      value
    });
  };

  createTankPostReply = async (e, PostReplyMutation, postId, refetch) => {
    if (e.key == 'Enter') {
      const reply = await PostReplyMutation({
        variables: {
          body: this.state.value,
          postId
        }
      });

      await refetch();
      this.setState({ showTextArea: false });
    }
  };

  render() {
    const { postId, refetch } = this.props;
    return (
      <Mutation mutation={CREATE_TANK_REPLY_MUTATION}>
        {(createTankReply, { loading, error }) => {
          if (error) return <Text>uh ohhh... Something went wrong!</Text>;
          if (loading) return <SmallerSpinner />;

          return (
            <React.Fragment>
              <Text bold size='xs'>
                <IconButton
                  onClick={this.handleClick}
                  icon='speech-ellipsis'
                  size='sm'
                />
              </Text>

              <Box>
                {this.state.showTextArea && (
                  <form
                    onKeyDown={e =>
                      this.createTankPostReply(
                        e,
                        createTankReply,
                        postId,
                        refetch
                      )
                    }
                  >
                    <TextArea
                      id='discussions'
                      onChange={this.handleChange}
                      placeholder='Reply... Hit Enter to submit'
                      value={this.state.value}
                    />
                  </form>
                )}
              </Box>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default Reply;
