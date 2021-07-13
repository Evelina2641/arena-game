import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LeaderBoard.css";
import Loading from "../components/Loading";
import Header from "../components/Header";

function LeaderBoard() {
  if (!localStorage.getItem("game-auth")) {
    window.location.href = "/";
  }
  const [usersData, setUsersData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const endPoint = "https://react-arena-game.herokuapp.com/api/user/users";

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(endPoint);
      let data = await response.json();
      setUsersData(data);
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  // Sorted array
  const newArray = usersData.sort((a, b) => {
    return b.gold - a.gold;
  });

  return isLoaded ? (
    <div className="leaderboard_container">
      <Header text={"Leader board"} />
      <div className="trophy">
        <img
          src="https://cdn2.iconfinder.com/data/icons/valuable-items/200/achievement_best_gold_leaderboards_movie_trophy_winner-512.png"
          alt=""
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Username</th>
            <th>Gold</th>
          </tr>
          {newArray.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <th>
                <Link to={"/user/" + user._id}>{user.username}</Link>
              </th>
              <th>{user.gold}$</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <Loading />
  );
}

export default LeaderBoard;
