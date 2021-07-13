import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PlayerDetail.css";
import Loading from "../components/Loading";
import Header from "../components/Header";

function PlayerDetail() {

  const [userData, setUserData] = useState({});
  const [isLoaded, setisLoaded] = useState(false);

  let { id } = useParams();

  const endPoint = "https://react-arena-game.herokuapp.com/api/user/";
  
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(endPoint + id);
      let data = await response.json();
      setUserData(data);
      setisLoaded(true);
    }
    fetchData();
  }, [id]);
  return isLoaded ? (
    <div className="userDetail_container">
      <Header />
      <div className="wrapper">
        <h3>{userData.username}</h3>
        <img src={userData.image} alt="" />
        <div className="container">
          {" "}
          <p>
            <img
              src="https://cdn2.iconfinder.com/data/icons/valuable-items/200/buy_coin_fortune_gold_money_reward_treasure-512.png"
              alt=""
            />
            <span>{userData.gold}</span>
          </p>
          <p>
            <img
              src="https://cdn3.iconfinder.com/data/icons/casino-2/256/Heart_Suit-512.png"
              alt=""
            />
            <span>{userData.health}</span>
          </p>
        </div>
        <div className="inventory_container">
          <h3>INVENTORY</h3>
          <div className="inventory_wrapper">
            {userData.inventory.map((e) => (
              <div key={e.id}>
                <img src={e.image} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PlayerDetail;
