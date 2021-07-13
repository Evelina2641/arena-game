import React from "react";
import "./Modal.css";
import InventoryItems from "./InventoryItems";

function Modal({
  onClick,
  name,
  update,
  hasArmor,
  hasWeapon,
  isInventory,
  userDead,
  text,
  onClick2
}) {
  return (
    <div className="modal">
      <div className="modal_item">
        <h1>{name}</h1>
        {isInventory && (
          <div className="items_container">
            <InventoryItems
              name={name}
              update={update}
              closeModal={onClick}
              hasArmor={hasArmor}
              hasWeapon={hasWeapon}
            />
          </div>
        )}
        {userDead && (
                    <div className="message">
                    You died.. <img src="https://cdn4.iconfinder.com/data/icons/emojis-flat-pixel-perfect/64/emoji-48-512.png" alt="" /><br />
                    <p>{text} </p>
                </div>
        )}
        <div className="buttons">
          {userDead && <button onClick={onClick2}>DONATE</button>}
          <button onClick={onClick}>GO BACK</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
