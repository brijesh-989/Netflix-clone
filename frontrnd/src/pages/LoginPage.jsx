import { useState } from "react";
import { Link } from "react-router-dom";
import NetflixLogo from "../assets/netflix-logo.png";
const LoginPage = () => {
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
            <div className="form-group">
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
            <div className="form-group">
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
            Dont you have a account ?{" "}
            <Link to={"/signup"} className="link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
