import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserInfoContext } from "../App";
import "./GameWindow.css";
import Loading from "../components/Loading";
function GameWindow({ updateLoaded }) {
  const userInfo = useContext(UserInfoContext);
  const handleLogout = () => {
    localStorage.removeItem("game-auth");
    window.location.href = "/";
  };
  return (
    <>
      {updateLoaded ? (
        <>
          <header>
            <div className="wrapper">
              <img src={userInfo.userInfo.image} alt="" />
              <h2> {userInfo.userInfo.username}</h2>
            </div>
            <div className="wrapper">
              <h3>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/valuable-items/200/buy_coin_fortune_gold_money_reward_treasure-512.png"
                  alt=""
                />
                <span>{userInfo.userInfo.gold}</span>
              </h3>
              <h3>
                <img
                  src="https://cdn3.iconfinder.com/data/icons/casino-2/256/Heart_Suit-512.png"
                  alt=""
                />{" "}
                <span>{userInfo.userInfo.health}</span>
              </h3>
              <button>
                <Link to={"/edit-profile"}>
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/Hand_Drawn_Web_Icon_Set/128/user_edit.png"
                    alt=""
                  />
                </Link>
              </button>
              <button onClick={handleLogout}>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/witchcraft/200/door_exit_knob_magic_medieval_old-512.png"
                  alt=""
                />
              </button>
            </div>
          </header>
          <main>
            <nav>
              <ul>
                <div>
                  <Link to="/shop">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/marketing-2-2/224/pillars-old-building-bank-512.png"
                      alt=""
                    />
                  </Link>
                </div>
                <div>
                  <Link to="/inventory">
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/gaming-and-playing/128/__RPG-512.png"
                      alt=""
                    />
                  </Link>
                </div>
                <div>
                  <Link to="/arena">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/landmark-filled-outline/436/colosseum_coliseum_landmark_rome_architecture_roman_arena_gladiator_stadium-512.png"
                      alt=""
                    />
                  </Link>
                </div>
                <div>
                  <Link to="/leaders-board">
                    <img
                      className="leader_picture"
                      src="https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/award_cup_achievement_prize-512.png"
                      alt=""
                    />
                  </Link>
                </div>
              </ul>
            </nav>
          </main>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default GameWindow;
