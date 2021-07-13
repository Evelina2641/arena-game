import React, { useContext } from "react";
import { UserInfoContext } from "../App";
import "./Header.css";

function Header({ text }) {
  const userInfo = useContext(UserInfoContext);
  return (
    <div>
      <div className="header_wrapper">
        <button onClick={() => (window.location.href = "/")}>
          {" "}
          <img
            src="https://cdn1.iconfinder.com/data/icons/fs-icons-ubuntu-by-franksouza-/512/gtk-go-back-ltr.png"
            alt=""
          />
        </button>
        <h1>{text}</h1>
        <h3>
          <img
            src="https://cdn2.iconfinder.com/data/icons/valuable-items/200/buy_coin_fortune_gold_money_reward_treasure-512.png"
            alt=""
          />
          <span>{userInfo.userInfo.gold}</span>
        </h3>
      </div>
    </div>
  );
}

export default Header;
