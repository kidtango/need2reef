/* eslint-disable */
import React, { Component } from 'react';
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
  Link
} from 'gestalt';
import { setToken } from '../../utils';

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
    showModal: false,
    password: '',
    toast: false,
    toastMessage: '',
    email: ''
  };

  handleChange = ({ event, value }) => {
    event.persist();

    this.setState({ [event.target.name]: value });
  };

  handleToggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  loginUser = async (e, login) => {
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
      this.setState({ showModal: !showModal });
      this.props.history.push(location.pathname);
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
      <Mutation mutation={LOGINUSER_MUTATION}>
        {(login, { error, loading }) => {
          return (
            <Box marginLeft={-1} marginRight={-1}>
              <Box padding={1}>
                <Button
                  text='Log in'
                  color='blue'
                  onClick={this.handleToggleModal}
                />
                {showModal && (
                  <Layer>
                    <Container>
                      <Modal
                        onDismiss={this.handleToggleModal}
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
                                  alt='TheCoralStore'
                                  naturalHeight={1}
                                  naturalWidth={1}
                                />
                              </Box>
                            </Box>
                            <Box>
                              <Heading size='xs'>
                                Log in to order some Uber Corals
                              </Heading>
                            </Box>
                          </Box>
                        }
                        size='sm'
                        onDismiss={this.handleToggleModal}
                        footer={
                          <Box
                            display='flex'
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                          >
                            <Box>
                              <Text align='center'>
                                Log in to access UC's exclusive deals
                              </Text>
                              <Text align='center' wash italic size='xs'>
                                By continuing, you agree to UC's Terms of
                                Service, Privacy Policy
                              </Text>
                              <Link href='#'>
                                <Text bold size='md' align='center'>
                                  Already a member? Log in
                                </Text>
                              </Link>
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
                        size='md'
                      >
                        <form onSubmit={e => this.loginUser(e, login)}>
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
                                  placeholder='Email address'
                                  value={email}
                                  type='email'
                                  onChange={this.handleChange}
                                />
                              </Box>
                              <Box padding={1}>
                                <TextField
                                  id='password '
                                  name='password'
                                  placeholder='Password'
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
    );
  }
}

export default withRouter(Signin);
