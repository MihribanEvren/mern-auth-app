import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import { validatePassword } from '../helpers/validate';
import { FaEye } from 'react-icons/fa';

import styles from '../styles/Username.module.css';
import { useState } from 'react';

function Password() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPassword = () => {
    setIsShowPassword((isShowPassword) => !isShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: validatePassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className={styles.glass}>
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl text-center text-gray-500 ">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center profile">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
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
                  className="absolute inset-y-0 flex items-center cursor-pointer right-3"
                  onClick={showPassword}
                >
                  <FaEye />
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
