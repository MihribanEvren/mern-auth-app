import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import { validateUsername } from '../helpers/validate';

import styles from '../styles/Username.module.css';
import { useAuthStore } from '../store/store';

function Username() {
  const navigate = useNavigate();
  const setUserName = useAuthStore((state) => state.setUserName);

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: validateUsername,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUserName(values.username);
      navigate('/password');
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
              <input
                {...formik.getFieldProps('username')}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <button className={styles.btn} type="submit">
                {`Let's Go`}
              </button>
            </div>

            <div className="py-4 my-6 text-center">
              <span className="text-gray-600 ">
                Not a Member{' '}
                <Link className="text-pink-600" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Username;
