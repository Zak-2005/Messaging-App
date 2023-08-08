import "../../css/register.css";
import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom'
export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSetUser = (value) => {
    setUser(value);
  };
  const handleSetPass = (value) => {
    setPass(value);
  };

  const handleLogin = async (user, pass, e) => {
    e.preventDefault();

    const loginInfo = {
      user: user,
      pass: pass,
    };

    try {
      const response = await axios.post(
        "http://localhost:3500/login",
        loginInfo,
        { withCredentials: true }
      );
      console.log(response.data, "hello");
      if (response.data) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setLoginFailed(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="registerForm">
        <h1 className="formTitle">Login:</h1>
        <form method="POST" onSubmit={(e) => handleLogin(user, pass, e)}>
          <div className="inputField">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="user"
              placeholder="Enter your username:"
              value={user}
              onChange={(e) => handleSetUser(e.target.value)}
            />
          </div>
          <div className="inputField">
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              name="pass"
              placeholder="Enter your password:"
              value={pass}
              onChange={(e) => handleSetPass(e.target.value)}
            />
          </div>
          <button type="submit">Finish!</button>
        </form>
        {loginFailed ? (
          <div className="warning">
            Incorrect Username and password or you already have an account,{" "}
            <Link to="/">Create an Account</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
