import React, { Component } from 'react';
import { format } from 'date-fns';
import { Box, TextArea, IconButton, Text, Avatar } from 'gestalt';

class Comments extends Component {
  state = {
    value: '',
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
  render() {
    const { comments } = this.props;
    // if (comments.length == 0) {
    //   return (
    //     <TextArea
    //       id='discussions'
    //       onChange={this.handleChange}
    //       placeholder='Start a discussion with me...'
    //       value={this.state.value}
    //     />
    //   );
    // }

    return (
      <Box
        display='flex'
        direction='column'
        alignItems='start'
        justifyContent='start'
      >
        {comments.map(comment => (
          <Box>
            <Box display='flex' alignItems='center'>
              <Box paddingX={1}>
                <Avatar name={comment.author.name} size='sm' />
              </Box>
              <Box paddingX={1}>
                <Text bold size='xs' align='left'>
                  {comment.author.name}
                </Text>
              </Box>
            </Box>
            <Box paddingX={2}>
              <Text align='left' color='orange' key={comment.id}>
                {comment.body}
              </Text>

              <Box direction='row' alignItems='center' display='flex'>
                <Box paddingX={1}>
                  <Text color='gray' italic size='xs'>
                    {format(comment.createdAt, 'MMMM d, YYYY', {
                      awareOfUnicodeTokens: true
                    })}
                  </Text>
                </Box>
                <Box paddingX={1}>
                  <Text>
                    <Text bold size='xs'>
                      Reply
                    </Text>
                  </Text>
                </Box>
                <Box paddingX={1}>
                  <IconButton icon='heart' size='sm' />
                </Box>
              </Box>
            </Box>
            {comment.replies.map(reply => (
              <Box paddingX={6}>
                <Box
                  display='flex'
                  direction='row'
                  alignItems='center'
                  padding={1}
                >
                  <Avatar name={reply.author.name} size='sm' />
                  <Box paddingX={1}>
                    <Text bold size='xs' key={reply.id}>
                      {reply.author.name}
                    </Text>
                  </Box>
                </Box>
                <Box paddingX={2}>
                  <Text color='orange' key={reply.id}>
                    {reply.body}
                  </Text>

                  <Box direction='row' alignItems='center' display='flex'>
                    <Box paddingX={1}>
                      <Text color='gray' italic size='xs'>
                        {format(comment.createdAt, 'MMMM d, YYYY', {
                          awareOfUnicodeTokens: true
                        })}
                      </Text>
                    </Box>
                    <Box paddingX={1}>
                      <Text>
                        <Text bold size='xs'>
                          Reply
                        </Text>
                      </Text>
                    </Box>
                    <Box paddingX={1}>
                      <IconButton icon='heart' size='sm' />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    );
  }
}

export default Comments;

{
  /* <Box>
            <IconButton
              icon='speech-ellipsis'
              size='xl'
              onClick={this.handleClick}
            />
          </Box>
          {this.state.showTextArea && (
            <form onSubmit={this.handleSubmit}>
              <TextArea
                id='discussions'
                onChange={this.handleChange}
                placeholder='Start a discussion with me...'
                value={this.state.value}
              />
            </form>
          )} */
}
