import React, { useState } from "react";
import "./AuthStyle.css";
import aircraftImage from "../Assets/undraw_aircraft_usu4.svg";
import luggageImage from "../Assets/undraw_luggage_k1gn.svg";
import ButtonAuth from "../Component/ButtonAuth";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRegisterData({ ...registerData, role: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    alert("Login is currently disabled.");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register Data:", registerData);
    alert("Registration is currently disabled.");
  };

  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="form_container">
        <div className="signin_signup">
          {/* Login form */}
          <form className="sign_in_form" onSubmit={handleLogin}>
            <h2 className="title">Login</h2>

            <div className="wave-group">
              <input
                required
                type="text"
                className="input"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
              <span className="bar"></span>
              <label className="label">
                {"Username".split("").map((char, i) => (
                  <span key={i} className="label-char" style={{ "--index": i }}>{char}</span>
                ))}
              </label>
            </div>

            <div className="wave-group password-group">
              <input
                required
                type={showPasswordLogin ? "text" : "password"}
                className="input"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              <span className="bar"></span>
              <label className="label">
                {"Password".split("").map((char, i) => (
                  <span key={i} className="label-char" style={{ "--index": i }}>{char}</span>
                ))}
              </label>
              <span
                className="eye-icon"
                onClick={() => setShowPasswordLogin((prev) => !prev)}
              >
                {showPasswordLogin ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
              </span>
            </div>

            <div className="forgot-password" style={{ marginBottom: "1.5rem"}}>
              <a href="#">Forgot Password?</a>
            </div>

            <ButtonAuth label="Log In" />

            <div className="social_login">
              <p>Or</p>
              <div className="social_icons">
                <a href="#">
                  <img src={require("../Assets/Google_Logo.png")} alt="Google Login" className="social_icon" />
                </a>
                <a href="#">
                  <img src={require("../Assets/Facebook_Logo.png")} alt="Facebook Login" className="social_icon" />
                </a>
              </div>
            </div>
          </form>

          {/* Register form */}
          <form className="sign_up_form" onSubmit={handleRegister}>
            <h2 className="title">Create Account</h2>

            <div className="wave-group">
              <input
                required
                type="text"
                className="input"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
              />
              <span className="bar"></span>
              <label className="label">
                {"Username".split("").map((char, i) => (
                  <span key={i} className="label-char" style={{ "--index": i }}>{char}</span>
                ))}
              </label>
            </div>

            <div className="wave-group">
              <input
                required
                type="email"
                className="input"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
              />
              <span className="bar"></span>
              <label className="label">
                {"Email".split("").map((char, i) => (
                  <span key={i} className="label-char" style={{ "--index": i }}>{char}</span>
                ))}
              </label>
            </div>

            <div className="wave-group">
              <input
                required
                type="text"
                inputMode="numeric"
                className="input"
                name="phone"
                value={registerData.phone}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                onChange={handleRegisterChange}
              />
              <span className="bar"></span>
              <label className="label">
                {"Phone".split("").map((char, i) => (
                  <span key={i} className="label-char" style={{ "--index": i }}>{char}</span>
                ))}
              </label>
            </div>

            <div className="wave-group password-group">
              <input
                required
                type={showPasswordRegister ? "text" : "password"}
                className="input"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
              />
              <span className="bar"></span>
              <label className="label">
                {"Password".split("").map((char, i) => (
                  <span key={i} className="label-char" style={{ "--index": i }}>{char}</span>
                ))}
              </label>
              <span
                className="eye-icon"
                onClick={() => setShowPasswordRegister((prev) => !prev)}
              >
                {showPasswordRegister ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
              </span>
            </div>
{/* Role Radio Buttons */}

            <div className="glass-radio-group" style={{ marginBottom: "1rem" }}>
              <input
                type="radio"
                name="role"
                id="role-user"
                value="user"
                checked={registerData.role === "user"}
                onChange={handleRoleChange}
              />
              <label htmlFor="role-user">User</label>

              <input
                type="radio"
                name="role"
                id="role-owner"
                value="owner"
                checked={registerData.role === "owner"}
                onChange={handleRoleChange}
              />
              <label htmlFor="role-owner">Owner</label>

              <div className="glass-glider"></div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="remember-checkbox" style={{ marginBottom: "1.5rem" }}>
              <label className="containercheckbox">
                <input type="checkbox" />
               <svg viewBox="0 0 64 64" height="1em" width="1em">
  <path
    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
    pathLength="575.0541381835938"
    className="pathcheckbox"
  ></path>
</svg>

                <span style={{ marginLeft: "8px", fontSize: "0.9rem", color: 'var(--color1)' }}>
                  Remember me
                </span>
              </label>
            </div>

            <ButtonAuth label="Register" />

            <div className="social_login">
              <p>Or</p>
              <div className="social_icons">
                <a href="#">
                  <img src={require("../Assets/Google_Logo.png")} alt="Google Login" className="social_icon" />
                </a>
                <a href="#">
                  <img src={require("../Assets/Facebook_Logo.png")} alt="Facebook Login" className="social_icon" />
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="panels_container">
        <div className="panel left_panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Create an account to explore and participate in your favorite events.</p>
            <button className="re_button btn transparent" onClick={handleToggle}>
              Sign Up
            </button>
          </div>
          <img src={aircraftImage} className="image" alt="aircraft" />
        </div>

        <div className="panel right_panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Welcome back! Log in to access your events.</p>
            <button className="re_button btn transparent" onClick={handleToggle}>
              Login
            </button>
          </div>
          <img src={luggageImage} className="image" alt="luggage" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
