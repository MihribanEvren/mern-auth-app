import toast from 'react-hot-toast';

//validate login page username
export function validateUsername(values) {
  const error = usernameVerify({}, values);
  return error;
}

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

//validate pasword page password
export function validatePassword(values) {
  const error = passwordVerify({}, values);
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
