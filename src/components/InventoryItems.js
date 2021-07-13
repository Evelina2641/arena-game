import React, { useContext, useState } from "react";
import { UserInfoContext } from "../App";
import "./InventoryItem.css";

function InventoryItems({ name, update, closeModal, hasArmor, hasWeapon }) {
  const userInfo = useContext(UserInfoContext);
  const [errorMessage, setErrorMessage] = useState("");
  const inventoryType = userInfo.userInfo.inventory.filter((i) => {
    if (name === "ARMOR") return i.type === "armor";
    if (name === "WEAPONS") return i.type === "weapon";
    if (name === "POTIONS") return i.type === "potion";
    else return null
  });
  const updateUser = async (id, health, gold) => {
    const token = localStorage.getItem("game-auth");
    await fetch("https://react-arena-game.herokuapp.com/api/user/update", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        id: id,
        health: health,
        gold: gold
      }),
    });
    update();
    closeModal()
  }
  const handleUsing = async (defence, type, id) => {
    if (type === "potion") {
      if (userInfo.userInfo.health === 100) {
        setErrorMessage("You health is already 100%");
      } else {
        if (Number(userInfo.userInfo.health) + Number(defence) > 100) {
            updateUser(id, 100, userInfo.userInfo.gold)
        } else {
          let health = Number(userInfo.userInfo.health) + Number(defence);
          updateUser(id, health, userInfo.userInfo.gold)
        }

      }
    }
    if (type === 'armor' || type === 'weapon') {
        let itemObject = userInfo.userInfo.inventory.filter(e =>  e.id === id)
        if(type === 'armor') {
            userInfo.setArmor(itemObject)
            closeModal()
            hasArmor()
        }
        if(type === 'weapon') {
            userInfo.setWeapon(itemObject)
            closeModal()
            hasWeapon()
        }
    }
  };
  return (
    <>
      <div className="inventoryItem_container">
        {inventoryType.length === 0 ? (
          <h3>Sorry.. You don't have any {name}
          <a href="/shop"> <br />(SHOP)</a>
          </h3>
        ) : (
          inventoryType.map((e, index) => {
            return (
              <div key={e.id}>
                <h3>{e.name}</h3>
                <p>Defence: {e.defence}</p>
                <p>Price: {e.price}$</p>
                <p>Sell price: {e.sellprice}$</p>
                <img src={e.image} alt="" />
                <button
                  onClick={() =>
                    handleUsing(e.defence, e.type, e.id)
                  }
                >
                  USE
                </button>
              </div>
            );
          })
        )}
      </div>
      {errorMessage !== "" && <p className="errorMessage">{errorMessage}</p>}
    </>
  );
}

export default InventoryItems;
