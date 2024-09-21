import React, { useState } from "react";
import NetflixLogo from "../assets/netflix-logo.png";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <div className="banner">
      <div className="signUp-page">
        <div>
          <Link to={"/"}>
            <img className="signup-logo" src={NetflixLogo}></img>
          </Link>
        </div>
        <div className="signup-form">
          <form className="wrapper" onSubmit={handleSubmit}>
            <div class="form-group">
              <input
                placeholder="Email address"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="form-group">
              <input
                placeholder="password"
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <div className="text-member">
            Already a member ?{" "}
            <Link to={"/login"} className="link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
