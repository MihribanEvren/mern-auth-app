import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import { validateProfile } from '../helpers/validate';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';

import { useState } from 'react';
import convertImageToBase64 from '../helpers/convert';

function Profile() {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      email: '',
    },
    validate: validateProfile,
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
          className={`${styles.glass} ${extend.glass} h-screen py-12 w-2/5 sm:w-3/5 lg:w-2/5`}
        >
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl text-center text-gray-500 ">
              You can update the details.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center profile">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
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
              <div className="flex w-3/4 gap-10 name">
                <input
                  {...formik.getFieldProps('firstName')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  {...formik.getFieldProps('lastName')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div className="flex w-3/4 gap-10 name">
                <input
                  {...formik.getFieldProps('phone')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Phone"
                />
                <input
                  {...formik.getFieldProps('email')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="flex w-3/4 gap-10 name">
                <input
                  {...formik.getFieldProps('address')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Address"
                />
                <button className={styles.btn} type="submit">
                  Update
                </button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-gray-600 ">
                Come Back Later?{' '}
                <Link className="text-pink-600" to="/">
                  Log out
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
