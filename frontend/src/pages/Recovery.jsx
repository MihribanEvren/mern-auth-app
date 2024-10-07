import styles from '../styles/Username.module.css';

function Recovery() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className={styles.glass}>
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl text-center text-gray-500 ">
              Enter OTP to recover your password.
            </span>
          </div>
          <form className="pt-20">
            <div className="flex flex-col items-center gap-4 textbox">
              <div className="text-center input">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit code sent to your email.
                </span>
                <input
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
                <button className={styles.btn} type="submit">
                  {`Recover`}
                </button>
              </div>
            </div>

            <div className="py-4 my-6 text-center">
              <span className="text-gray-600 ">
                {`Cant't get OTP? `}
                <button className="text-pink-600">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
