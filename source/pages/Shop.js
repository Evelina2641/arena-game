import React, { useState, useContext } from "react";
import { UserInfoContext } from "../App";
import "./Shop.css";
import Header from "../components/Header";
function Shop({ update }) {
  const userInfo = useContext(UserInfoContext);
  const [message, setMessage] = useState("");
  if (!localStorage.getItem("game-auth")) {
    window.location.href = "/";
  }
  const handleBuying = async (name, defence, price, sellprice, type, image) => {
    if (userInfo.userInfo.gold >= price) {
        setMessage("You bought a new inventory! ");
      let randomId = Math.floor((1 + Math.random()) * 0x10000);
      let inventoryId = randomId.toString();
      let item = {
        name: name,
        defence: defence,
        price: price,
        sellprice: sellprice,
        image: image,
        type: type,
        id: inventoryId,
      };
      let token = localStorage.getItem("game-auth");
      await fetch("https://react-arena-game.herokuapp.com/api/user/update/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          price: price,
          item: item,
        }),
      });
      update();
    } else {
        setMessage("Not enough money");
    }
  };
  return (
    <div className="shop_container">
      <Header text={"SHOP"} />
      <div className="armors">
        <h2>ARMORS</h2>
        <div className="wrapper">
          <div>
            <h4>
              <span>Defence:</span> 3
            </h4>
            <h4>
              <span>Price:</span> 50$
            </h4>
            <h4>
              <span>Sell price:</span> 10$
            </h4>
            <img
              src="https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_4-77-512.png"
              alt=""
            />
            <button
              onClick={() =>
                handleBuying(
                  "",
                  "3",
                  "50",
                  "10",
                  "armor",
                  "https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_4-77-512.png"
                )
              }
            >
              BUY
            </button>
          </div>
          <div>
            <h4>
              <span>Defence:</span> 7
            </h4>
            <h4>
              <span>Price:</span> 250$
            </h4>
            <h4>
              <span>Sell price:</span> 100$
            </h4>
            <img
              src="https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_--60-512.png"
              alt=""
            />
            <button
              onClick={() =>
                handleBuying(
                  "",
                  "7",
                  "250",
                  "100",
                  "armor",
                  "https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_--60-512.png"
                )
              }
            >
              BUY
            </button>
          </div>
          <div>
            <h4>
              <span>Defence:</span> 8
            </h4>
            <h4>
              <span>Price:</span> 800$
            </h4>
            <h4>
              <span>Sell price:</span> 300$
            </h4>
            <img
              src="https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_--30-512.png"
              alt=""
            />
            <button
              onClick={() =>
                handleBuying(
                  "",
                  "8",
                  "800",
                  "300",
                  "armor",
                  "https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_--30-512.png"
                )
              }
            >
              BUY
            </button>
          </div>
        </div>
      </div>
      <p>{message}</p>
      <div className="weapons">
        <h2>WEAPONS</h2>
        <div className="wrapper">
          <div>
            <h4>Sword</h4>
            <h4>
              <span>Damage:</span> 8
            </h4>
            <h4>
              <span>Price:</span> 40$
            </h4>
            <h4>
              <span>Sell price:</span> 5$
            </h4>
            <h4>
              <span>Special:</span> 20% chance to block the enemy attack
            </h4>{" "}
            <br />
            <img
              src="https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_--47-512.png"
              alt=""
            />
            <button
              onClick={() =>
                handleBuying(
                  "Sword",
                  "8",
                  "40",
                  "5",
                  "weapon",
                  "https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_--47-512.png"
                )
              }
            >
              BUY
            </button>
          </div>
          <div>
            <h4>Bow</h4>
            <h4>
              <span>Damage:</span> 6
            </h4>
            <h4>
              <span>Price:</span> 300$
            </h4>
            <h4>
              <span>Sell price:</span> 80$
            </h4>
            <h4>
              <span>Special:</span> 30% chance to do double damage to enemy
            </h4>
            <img
              src="https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_--46-512.png"
              alt=""
            />
            <button
              onClick={() =>
                handleBuying(
                  "Bow",
                  "6",
                  "300",
                  "80",
                  "weapon",
                  "https://cdn3.iconfinder.com/data/icons/medieval-2d-rpg-game-items-weapons-armour-helmets-/26/GAME-SVG_--46-512.png"
                )
              }
            >
              BUY
            </button>
          </div>
          <div>
            <h4>Magic wand</h4>
            <h4>
              <span>Damage:</span> 5
            </h4>
            <h4>
              <span>Price:</span> 1000$
            </h4>
            <h4>
              <span>Sell price:</span> 400$
            </h4>
            <h4>
              <span>Special:</span> 40% chance to heal on enemy attack 10 points
            </h4>
            <img
              src="https://cdn4.iconfinder.com/data/icons/viking-17/60/mace__warrior__viking__armor__combat-256.png"
              alt=""
            />
            <button
              onClick={() =>
                handleBuying(
                  "Magic wand",
                  "5",
                  "1000",
                  "400",
                  "weapon",
                  "https://cdn4.iconfinder.com/data/icons/viking-17/60/mace__warrior__viking__armor__combat-256.png"
                )
              }
            >
              BUY
            </button>
          </div>
        </div>
      </div>
      <p>{message}</p>
      <div className="potions">
        <h2>POTIONS</h2>
        <div className="wrapper">
          <div>
            <h4>
              <span>Heals:</span> 20
            </h4>
            <h4>
              <span>Price:</span> 10$
            </h4>
            <h4>
              <span>Sell price:</span> 5$
            </h4>
            <img
              src="https://cdn0.iconfinder.com/data/icons/video-games-ultra-color/60/024_-_Potion-128.png"
              alt=""
            />
            <button
              onClick={() =>
                handleBuying(
                  "",
                  "20",
                  "10",
                  "5",
                  "potion",
                  "https://cdn0.iconfinder.com/data/icons/video-games-ultra-color/60/024_-_Potion-128.png"
                )
              }
            >
              BUY
            </button>
          </div>
          <div>
            <h4>
              <span>Heals:</span> 35
            </h4>
            <h4>
              <span>Price:</span> 30$
            </h4>
            <h4>
              <span>Sell price:</span> 10$
            </h4>
            <img
              src="https://cdn1.iconfinder.com/data/icons/steaming-gaming-1/80/HP-rpg-HitPoint-HealthPoint-flask-128.png"
              alt=""
            />
            <button
              onClick={() =>
                handleBuying(
                  "",
                  "35",
                  "30",
                  "10",
                  "potion",
                  "https://cdn1.iconfinder.com/data/icons/steaming-gaming-1/80/HP-rpg-HitPoint-HealthPoint-flask-128.png"
                )
              }
            >
              BUY
            </button>
          </div>
          <div>
            <h4>
              <span>Heals:</span> 50
            </h4>
            <h4>
              <span>Price: </span> 60$
            </h4>
            <h4>
              <span>Sell price:</span> 20$
            </h4>
            <img
              src="https://cdn4.iconfinder.com/data/icons/game-elements-yellow/60/008_-_Potion-128.png"
              alt=""
            />
            <button
              onClick={() =>
                handleBuying(
                  "",
                  "50",
                  "60",
                  "20",
                  "potion",
                  "https://cdn4.iconfinder.com/data/icons/game-elements-yellow/60/008_-_Potion-128.png"
                )
              }
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
