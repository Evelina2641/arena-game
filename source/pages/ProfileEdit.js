import React, { useState, useContext } from "react";
import { UserInfoContext } from "../App";
import "./ProfileEdit.css";
import Header from "../components/Header";

function ProfileEdit({ update }) {
  const userInfo = useContext(UserInfoContext);
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const [message, setmessage] = useState("");

  const saveUsername = async () => {
    let token = localStorage.getItem("game-auth");
    let response = await fetch(`https://react-arena-game.herokuapp.com/api/user/edit/username`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    const data = await response.json();
    if (data.success === false) {
      setmessage(data.message);
    } else {
      setmessage("Successfully changed");
      setUsername("");
    }
    update();
  };
  const savePicture = async () => {
    let token = localStorage.getItem("game-auth");
    await fetch(`https://react-arena-game.herokuapp.com/api/user/edit/picture`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        image: picture,
      }),
    });
    setmessage("Successfully changed");
    setPicture("");
    update();
  };
  return (
    <>
      <Header text={"Edit profile"} />
      <div className="edit_container">
        <h2>{userInfo.userInfo.username}</h2>
        <img src={userInfo.userInfo.image} alt="" />
        <div className="edit_username">
          <label>Edit username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={saveUsername}>Save</button>
        </div>
        <p>{message}</p>
        <div className="edit_image">
          <label>Edit profile picture(URL)</label>
          <input
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          <button onClick={savePicture}>Save</button>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
