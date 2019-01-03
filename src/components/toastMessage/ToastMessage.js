import React from 'react';
import { Toast } from 'gestalt';

const ToastMessage = ({ show, message, color }) =>
  show && <Toast color={color} text={message} icon='face-smiley' />;

export default ToastMessage;
