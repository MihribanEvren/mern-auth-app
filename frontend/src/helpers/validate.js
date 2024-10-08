import toast from 'react-hot-toast';
import { authenticate } from './helper';

//validate login page username
export async function validateUsername(values) {
  const error = usernameVerify({}, values);

  if (values.username) {
    const { status } = await authenticate(values.username);
    if (status !== 200) {
      error.username = toast.error('Username does not exist');
    }
  }

  return error;
}

//validate register form
export async function validateRegister(values) {
  const error = usernameVerify({}, values);
  passwordVerify(error, values);
  emailVerify(error, values);
  return error;
}

//validate profile page
export async function validateProfile(values) {
  const error = emailVerify({}, values);
  return error;
}

//validate reset page
export async function resetPasswordValidation(values) {
  const error = passwordVerify({}, values);
  if (values.password !== values.confirmPassword) {
    error.exist = toast.error(`Passwords don't match`);
  }
  return error;
}

//validate password page
export async function validatePassword(values) {
  const error = passwordVerify({}, values);
  return error;
}

/***********/

//validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username is required');
  } else if (values.username.length < 3) {
    error.username = toast.error('Username must be at least 3 characters');
  } else if (values.username.length > 20) {
    error.username = toast.error('Username must be at most 20 characters');
  } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
    error.username = toast.error(
      'Username must contain only letters, numbers, and underscores'
    );
  }
  return error;
}

//validate password
function passwordVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error('Password is required');
  } else if (values.password.length < 6) {
    error.password = toast.error('Password must be at least 6 characters');
  } else if (values.password.length > 40) {
    error.password = toast.error('Password must be at most 40 characters');
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Password must not contain spaces');
  }
  return error;
}

//validate email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    error.email = toast.error('Invalid email address');
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Email must not contain spaces');
  }
  return error;
}
