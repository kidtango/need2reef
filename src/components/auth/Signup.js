/* eslint-disable */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ToastMessage from '../toastMessage/ToastMessage';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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
  Link,
  Touchable
} from 'gestalt';
import { setToken } from '../../utils';
import Profiles from '../home/Profiles';

const CREATEUSER_MUTATION = gql`
  mutation createUser($email: String!, $name: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

class Signup extends React.Component {
  state = {
    showModal: true,
    password: '',
    email: '',
    toast: false,
    toastMessage: '',
    name: ''
  };

  handleChange = ({ event, value }) => {
    event.persist();

    this.setState({ [event.target.name]: value });
  };

  // handleToggleModal = () => {
  //   const { showModal } = this.state;
  //   this.setState({ showModal: !showModal });
  // };

  createUser = async (e, signupUser, client) => {
    e.preventDefault();

    const { email, password, name, showModal } = this.state;

    if (this.isFormEmpty(this.state)) {
      this.showToast('Please fill in all fields');
      return;
    }

    // Sign up user
    try {
      const user = await signupUser({
        variables: {
          password,
          email,
          name
        }
      });
      setToken(user.data.createUser.token);
      this.setState({ showModal: !showModal });
      this.props.history.push(location.pathname);
      client.resetStore();
    } catch (error) {
      this.showToast('Uh ohh...Something went wrong');
      console.log(error);
    }
  };

  isFormEmpty = ({ email, password, name }) => {
    return !email || !password || !name;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => {
      this.setState({ toast: false, toastMessage: '' });
    }, 5000);
  };

  render() {
    const {
      showModal,
      toast,
      toastMessage,
      name,
      password,
      email
    } = this.state;

    return (
      <React.Fragment>
        <Mutation mutation={CREATEUSER_MUTATION}>
          {(signup, { error, loading, client }) => {
            return (
              <Box marginLeft={-1} marginRight={-1}>
                <Box padding={1}>
                  {showModal && (
                    <Layer>
                      <Container>
                        <Modal
                          accessibilityCloseLabel='close'
                          accessibilityModalLabel='Sign up'
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
                              <Box alignItems='center' paddingX={10}>
                                <Heading size='xs'>
                                  Sign up to Tweef your reef!
                                </Heading>
                              </Box>
                            </Box>
                          }
                          size='sm'
                          footer={
                            <Box
                              display='flex'
                              direction='row'
                              justifyContent='center'
                              alignItems='center'
                            >
                              <Box padding={20}>
                                <Text align='center'>
                                  Sign up to create profile, trade, and sell
                                  corals
                                </Text>
                                <Text align='center' wash italic size='xs'>
                                  By continuing, you agree to Tweef.io's Terms
                                  of Service, Privacy Policy
                                </Text>
                                <NavLink to='/'>
                                  <Text bold size='md' align='center'>
                                    Already a member? Log in
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
                          size='sm'
                          role='alertdialog'
                        >
                          <form
                            onSubmit={e => this.createUser(e, signup, client)}
                          >
                            <Box padding={2}>
                              <Box
                                display='flex'
                                direction='column'
                                justifyContent='center'
                                alignItems='center'
                              >
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
                                    id='name'
                                    type='text'
                                    name='name'
                                    onChange={this.handleChange}
                                    placeholder='Name'
                                    value={name}
                                    onChange={this.handleChange}
                                  />
                                </Box>
                                <Box padding={1}>
                                  <TextField
                                    id='password'
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
                                {/* <Box padding={1}>
                          <TextField
                            id="firstname"
                            type="text"
                            name="firstname"
                            onChange={this.handleChange}
                            placeholder="First name"
                            value={firstname}
                            onChange={this.handleChange}
                          />
                        </Box> */}
                                {/* <Box padding={1} paddingX={2} paddingY={2}>
                          <TextField
                            id="lastname"
                            type="text"
                            name="lastname"
                            onChange={this.handleChange}
                            placeholder="Last name"
                            value={lastname}
                            onChange={this.handleChange}
                          />
                        </Box> */}
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

export default withRouter(Signup);
