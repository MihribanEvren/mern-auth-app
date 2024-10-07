import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helpers/validate';

import styles from '../styles/Username.module.css';

function Reset() {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className={styles.glass} style={{ width: '50%' }}>
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
