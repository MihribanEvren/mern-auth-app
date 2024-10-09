import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helpers/validate';

import styles from '../styles/Username.module.css';
import { resetPassword } from '../helpers/helper';
import { useAuthStore } from '../store/store';
import toast from 'react-hot-toast';
import { useFetch } from '../hooks/fetch.hook';

function Reset() {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const { apiData, isLoading, status, error } = useFetch('resetsession');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({
        username: username,
        password: values.password,
      });
      toast.promise(resetPromise, {
        loading: 'Resetting...',
        success: <b>Password has been reset successfully!</b>,
        error: <b>Could not reset password!</b>,
      });
      resetPromise.then(() => {
        navigate('/password');
      });
    },
  });

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }
  if (error) {
    return <h1 className="text-xl text-red-500">{error.message}</h1>;
  }
  if (status && status !== 201)
    return <Navigate to="/password" replace={true}></Navigate>;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className={styles.glass} style={{ width: '40%' }}>
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl text-center text-gray-500 ">
              Enter new password.
            </span>
          </div>
          <form className="py-16" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center gap-2 textbox">
              <input
                {...formik.getFieldProps('password')}
                className={`${styles.textbox} w-full pr-10`}
                type="text"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps('confirmPassword')}
                className={`${styles.textbox} w-full pr-10`}
                type="text"
                placeholder="Confirm Password"
              />
              <button className={`${styles.btn} w-full`} type="submit">
                Reset
              </button>
            </div>

            <div className="py-4 my-2 text-center">
              <button className="text-gray-600 ">
                Forgot Password?{' '}
                <Link className="text-pink-600" to="/recovery">
                  Recover Now
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
