import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import { useAuthStore } from '../store/store';
import { validatePassword } from '../helpers/validate';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

import styles from '../styles/Username.module.css';
import { useState } from 'react';
import { useFetch } from '../hooks/fetch.hook';
import { verifyPassword } from '../helpers/helper';
import toast from 'react-hot-toast';

function Password() {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPassword = () => {
    setIsShowPassword((isShowPassword) => !isShowPassword);
  };

  const { username } = useAuthStore((state) => state.auth);

  const { apiData, isLoading, error } = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: validatePassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const res = await toast.promise(
          verifyPassword({ username, password: values.password }),
          {
            loading: 'Verifying...',
            success: <b>Logged in successfully</b>,
            error: <b>Invalid password</b>,
          }
        );

        const { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile');
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }
  if (error) {
    return <h1 className="text-xl text-red-500">{error.message}</h1>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className={styles.glass}>
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.firstName || apiData?.username}!
            </h4>
            <span className="py-4 text-xl text-center text-gray-500 ">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center profile">
              <img
                src={apiData?.profile || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col items-center gap-4 textbox">
              <div className="relative w-3/4">
                <input
                  {...formik.getFieldProps('password')}
                  className={`${styles.textbox} w-full pr-10`}
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Password"
                />
                <span
                  className="absolute inset-y-0 flex items-center text-gray-500 cursor-pointer right-3"
                  onClick={showPassword}
                >
                  {isShowPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button className={styles.btn} type="submit">
                Sign in
              </button>
            </div>

            <div className="py-4 my-6 text-center">
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

export default Password;
