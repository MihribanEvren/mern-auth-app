import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import { validateRegister } from '../helpers/validate';

import styles from '../styles/Username.module.css';
import { useState } from 'react';
import convertImageToBase64 from '../helpers/convert';

function Register() {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate: validateRegister,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' });
      console.log(values);
    },
  });

  // formik doesn't support file input so we need to handle it manually
  const handleFile = async (e) => {
    const base64 = await convertImageToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div
          className={`${styles.glass} h-screen py-12 w-2/5 sm:w-3/5 lg:w-2/5`}
        >
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl text-center text-gray-500 ">
              Happy to join you!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center profile">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>

              <input
                onChange={handleFile}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
            <div className="flex flex-col items-center gap-2 textbox">
              <input
                {...formik.getFieldProps('username')}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <input
                {...formik.getFieldProps('email')}
                className={styles.textbox}
                type="text"
                placeholder="Email"
              />
              <input
                {...formik.getFieldProps('password')}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="mt-4 text-center">
              <span className="text-gray-600 ">
                Already Register?{' '}
                <Link className="text-pink-600" to="/">
                  Log in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
