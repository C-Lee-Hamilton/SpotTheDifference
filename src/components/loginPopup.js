function PopUp({ loginClickPopup }) {
  return (
    <div className="login-popup">
      <input type="text" placeholder="email" className="login-inputs"></input>
      <input
        type="password"
        placeholder="password"
        className="login-inputs"
      ></input>
      <a className="login-anchor">Forgot Password?</a>
      <button onClick={loginClickPopup} className="login-popup-button">
        Login
      </button>
      <button className="login-popup-button">Create Account</button>
      <button onClick={loginClickPopup} className="login-popup-button">
        Cancel
      </button>
    </div>
  );
}

export default PopUp;
