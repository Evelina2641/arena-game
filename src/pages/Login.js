import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../App";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authentication = useContext(AuthenticationContext);

  //Endpoint
  const endPoint = "https://react-arena-game.herokuapp.com/api/user/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userData = {
      username,
      password,
    };
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (data.success === false) {
      setErrorMessage(data.message);
    } else {
      let token = response.headers.get("token");
      authentication.setAuthenticated(token);
      localStorage.setItem("game-auth", token);
      window.location.href = "/";
    }
  };
  return (
    <div className="login_container">
      <h2>
        <img
          src="https://cdn2.iconfinder.com/data/icons/100-hand-drawn-comic-cartoon-signs/57/arrow_cursor_pointer_cartoon_comic_right-512.png"
          alt=""
        />
      </h2>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          <img
            src="https://cdn3.iconfinder.com/data/icons/web-and-seo-31/16/lock-secure-security-512.png"
            alt=""
          />
        </button>
        <p>{errorMessage}</p>
      </form>
      <Link to="/registration">Create account</Link>
    </div>
  );
}

export default Login;
