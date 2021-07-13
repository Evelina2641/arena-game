import React, { useState } from "react";
import "./Registration.css";

function Registration() {
  // State
  const [username, setUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const endPoint = "https://react-arena-game.herokuapp.com/api/user/signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      passwordOne,
      passwordTwo,
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
      seterrorMessage(data.message);
    }
    if (data.success !== false) {
      window.location.href = "/";
    }
  };
  return (
    <div className="registration_container">
      <img
        src="https://cdn3.iconfinder.com/data/icons/role-playing-game-5/340/spellbook_witch_book_spell_witchcraft_scroll-512.png"
        alt=""
      />
      <h2>Registration form</h2>

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={passwordOne}
          onChange={(e) => setPasswordOne(e.target.value)}
        />
        <label>Confirm password</label>
        <input
          type="password"
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
        />
        <button type="submit">
          <img
            src="https://cdn3.iconfinder.com/data/icons/web-and-seo-31/16/lock-secure-security-512.png"
            alt=""
          />
        </button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
}

export default Registration;
