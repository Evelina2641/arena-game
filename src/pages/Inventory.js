import React, { useContext } from "react";
import { UserInfoContext } from "../App";
import "./Inventory.css";
import Header from "../components/Header";

function Inventory({ update }) {
  const userInfo = useContext(UserInfoContext);

  if (!localStorage.getItem("game-auth")) {
    window.location.href = "/";
  }

  const handleSelling = async (sellprice, id) => {
    const gold = Number(userInfo.userInfo.gold) + Number(sellprice);
    let token = localStorage.getItem("game-auth");
    await fetch("https://react-arena-game.herokuapp.com/api/user/update", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        gold: gold,
        id: id,
        health: userInfo.userInfo.health,
      }),
    });
    update();
  };

  const inventory =
    userInfo.userInfo.inventory.length > 0 ? (
      userInfo.userInfo.inventory.map((i) => (
        <div key={i.id}>
          <h3>{i.name}</h3>
          <h4>
            <span>Defence:</span> {i.defence}
          </h4>
          <h4>
            <span>Price: </span>
            {i.price}$
          </h4>
          <h4>
            <span>Sellprice:</span> {i.sellprice}$
          </h4>
          <img src={i.image} alt="" />
          <button onClick={() => handleSelling(i.sellprice, i.id)}>SELL</button>
        </div>
      ))
    ) : (
      <h2>
        You don't have any inventory... <br /> You can buy it here
        <a href="https://arena-game-react.netlify.app/shop"> SHOP</a>
      </h2>
    );
    
  return (
    <div className="inventory_container">
      <Header text={"INVENTORY"} />
      <div className="wrapper">{inventory}</div>
    </div>
  );
}

export default Inventory;
