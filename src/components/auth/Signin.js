/* eslint-disable */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ToastMessage from '../toastMessage/ToastMessage';
import {
  Box,
  Text,
  Heading,
  Image,
  Container,
  TextField,
  Button,
  Modal,
  Layer,
  Touchable
} from 'gestalt';
import { setToken } from '../../utils';
import Profiles from '../home/Profiles';
import Signup from './Signup';

const LOGINUSER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        name
        email
        id
      }
    }
  }
`;

class Signin extends React.Component {
  state = {
    showModal: true,
    password: '',
    toast: false,
    toastMessage: '',
    email: ''
  };

  handleChange = ({ event, value }) => {
    event.persist();

    this.setState({ [event.target.name]: value });
  };

  loginUser = async (e, login, client) => {
    e.preventDefault();

    const { email, password, showModal } = this.state;

    if (this.isFormEmpty(this.state)) {
      this.showToast('Please fill in all fields');
      return;
    }

    // login user
    try {
      const user = await login({
        variables: {
          email,
          password
        }
      });
      setToken(user.data.login.token);
      this.props.history.push(location.pathname);
      client.resetStore();
    } catch (error) {
      this.showToast('Uh oh... Something went wrong');
    }
  };

  isFormEmpty = ({ email, password }) => {
    return !email || !password;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => {
      this.setState({ toast: false, toastMessage: '' });
    }, 5000);
  };

  render() {
    const { showModal, toast, toastMessage, password, email } = this.state;
    return (
      <React.Fragment>
        <Mutation mutation={LOGINUSER_MUTATION}>
          {(login, { error, loading, client }) => {
            return (
              <Box marginLeft={-1} marginRight={-1}>
                <Box padding={1}>
                  {showModal && (
                    <Layer>
                      <Container>
                        <Modal
                          accessibilityCloseLabel='close'
                          accessibilityModalLabel='Sign in'
                          heading={
                            <Box>
                              <Box
                                display='flex'
                                alignItems='center'
                                align='center'
                                justifyContent='center'
                              >
                                <Box height={50} width={50} margin={2}>
                                  <Image
                                    src='./icons/logo.png'
                                    alt='tweef.io'
                                    naturalHeight={1}
                                    naturalWidth={1}
                                  />
                                </Box>
                              </Box>
                              <Box paddingX={10} align='center'>
                                <Heading size='sm' overflow='breakWord'>
                                  Welcome back, Reefer
                                </Heading>
                              </Box>
                            </Box>
                          }
                          footer={
                            <Box
                              direction='column'
                              justifyContent='center'
                              alignItems='center'
                              alignSelf='center'
                            >
                              <Box>
                                <Text align='center' wash italic size='xs'>
                                  By continuing, you agree to Tweef's Terms of
                                  Service, Privacy Policy
                                </Text>
                                <NavLink to='/signup'>
                                  <Text bold size='md' align='center'>
                                    Not yet a member? Sign up
                                  </Text>
                                </NavLink>

                                <Box>
                                  <ToastMessage
                                    color={'orange'}
                                    show={toast}
                                    message={toastMessage}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          }
                          role='alertdialog'
                          size='sm'
                        >
                          <form
                            onSubmit={e => this.loginUser(e, login, client)}
                          >
                            <Box padding={2}>
                              <Box
                                display='flex'
                                direction='column'
                                justifyContent='center'
                                alignItems='center'
                              >
                                <Box padding={1} />
                                <Box padding={1}>
                                  <TextField
                                    id='email'
                                    name='email'
                                    placeholder='Email'
                                    value={email}
                                    type='email'
                                    onChange={this.handleChange}
                                  />
                                </Box>
                                <Box padding={1}>
                                  <TextField
                                    id='password '
                                    name='password'
                                    placeholder='Create a password'
                                    value={password}
                                    type='password'
                                    onChange={this.handleChange}
                                  />
                                  <Box padding={2} />

                                  <Button
                                    color='red'
                                    size='md'
                                    disable={loading}
                                    text='Continue'
                                    type='submit'
                                    onSubmit={this.handleToggleModal}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </form>
                        </Modal>
                      </Container>
                    </Layer>
                  )}
                </Box>
              </Box>
            );
          }}
        </Mutation>
        <Profiles />
      </React.Fragment>
    );
  }
}

export default withRouter(Signin);
