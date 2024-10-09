import styles from '../styles/Username.module.css';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { useEffect, useState } from 'react';
import { generateOTP, verifyOTP } from '../helpers/helper';
import { useNavigate } from 'react-router-dom';

function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if (OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!');
    });
  }, [username]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success('Verify Successfull!');
        navigate('/reset');
      } else {
        toast.error('Wrong OTP! Check email and try again.');
      }
    } catch (error) {
      toast.error('Wrong OTP! Check email and try again.');
    }
  }

  // Handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: 'Sending...',
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className={styles.glass}>
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl text-center text-gray-500 ">
              Enter OTP to recover your password.
            </span>
          </div>
          <form className="pt-20" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-4 textbox">
              <div className="text-center input">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit code sent to your email.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
                <button className={styles.btn} type="submit">
                  {`Recover`}
                </button>
              </div>
            </div>
          </form>
          <div className="py-4 my-6 text-center">
            <span className="text-gray-600 ">
              {`Cant't get OTP? `}
              <button onClick={resendOTP} className="text-pink-600">
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
