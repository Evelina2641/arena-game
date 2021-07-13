import React, { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../App";
import "./Arena.css";
import Modal from "../components/Modal";
import Header from "../components/Header";
function Arena({ update }) {
  if (!localStorage.getItem("game-auth")) {
    window.location.href = "/";
  }
  const userInfo = useContext(UserInfoContext);
  //Modal for iventory
  const [showModal, setshowModal] = useState(false);
  // Modal for death
  const [showDeathModal, setshowDeathModal] = useState(false);
  // Random number to choose enemy
  const [enemyNumber, setenemyNumber] = useState("");
  //Inventory name on modal
  const [inventoryName, setInventoryName] = useState("");
  // When user is choosing armor, set the picture
  const [hasArmor, setHasArmor] = useState(false);
  // When user is choosing weapon, set the picture
  const [hasWeapon, sethasWeapon] = useState(false);
  // Bar for enemy health
  const [enemyBar, setEnemyBar] = useState(100);
  // Show different messages
  const [message, setMessage] = useState("");
  // Set user animation on attack
  const [userAnimation, setUserAnimation] = useState("");
  // Set enemy animation on attack
  const [enemyAnimation, setEnemyAnimation] = useState("");
  // Enemies array
  const enemies = [
    {
      name: "Goblin",
      image:
        "https://cdn0.iconfinder.com/data/icons/game-elements-11/128/Elf-cloak-goblin-creature-fantasy-256.png",
      damage: "12",
    },
    {
      name: "Troll",
      image:
        "https://cdn4.iconfinder.com/data/icons/halloween-2451/64/Giant-troll-monster-ogre-beast-256.png",
      damage: "8",
    },
    {
      name: "Witch",
      image:
        "https://cdn2.iconfinder.com/data/icons/halloween-colored/48/JD-12-512.png",
      damage: "15",
    },
  ];
  //
  useEffect(() => {
    getNewEnemy();
  }, []);

  // Get random enemy
  const getNewEnemy = () => {
    setMessage('New enemy')
    let enemyNumber = Math.floor(Math.random() * 3);
    setenemyNumber(enemyNumber);
    setEnemyBar(100);
  };
  // Open modal ant set the name on it (armor, weapon,potion)
  const openInventoryModal = (name) => {
    setshowModal(true);
    setInventoryName(name);
  };
  // Sending updated information about user to backend
  const updateUserInfo = async (userHealth, gold, earnedGold) => {
    setTimeout(() => setUserAnimation("animationForUser"), 150);
    setUserAnimation("");
    setTimeout(() => setEnemyAnimation("animationForEnemy"), 350);
    setEnemyAnimation("");
    const token = localStorage.getItem("game-auth");
     await fetch("https://react-arena-game.herokuapp.com/api/user/update", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        health: userHealth,
        gold: gold + earnedGold,
      }),
    });

    update();
  };
  // When user have only weapon, managing attack
  const manageAttackOnlyWeapon = () => {
    setTimeout(() => setUserAnimation("animationForUser"), 150);
    setUserAnimation("");
    setTimeout(() => setEnemyAnimation("animationForEnemy"), 350);
    setEnemyAnimation("");
    let damageNumberForUser = enemies[enemyNumber].damage;
    let damageForUser = Math.floor(
      Math.random() * (Number(damageNumberForUser) + 1)
    );
    let userHealth = userInfo.userInfo.health - damageForUser;

    let damageNumberForEnemy = userInfo.weapon[0].defence;
    let damageForEnemy = Math.floor(
      Math.random() * (Number(damageNumberForEnemy) + 1)
    );
    let enemyHealth = enemyBar - damageForEnemy;
    if (damageForEnemy > enemyHealth) {
      getNewEnemy();
    } else {
      setEnemyBar(enemyHealth);
      updateUserInfo(userHealth, userInfo.userInfo.gold, 10);
    }
    if (userHealth <= 0) {
      updateUserInfo(0, userInfo.userInfo.gold, 0);
      setshowDeathModal(true);
    }
  };
  // When user have  weapon & armor, managing attack
  const manageAttackWeaponAndArmor = () => {
    setTimeout(() => {
      setUserAnimation("animationForUser");
    }, 150);
    setUserAnimation("");
    setTimeout(() => setEnemyAnimation("animationForEnemy"), 350);
    setEnemyAnimation("");

    let damageNumberForEnemy = userInfo.weapon[0].defence;
    let damageForEnemy = Math.floor(
      Math.random() * (Number(damageNumberForEnemy) + 1)
    );
    let enemyHealth = enemyBar - damageForEnemy;

    let damageNumberForUser = enemies[enemyNumber].damage;
    let damageForUser = Math.floor(
      Math.random() * (Number(damageNumberForUser) + 1)
    );
    let armor = userInfo.armor[0].defence;
    let armorDefence = Math.floor(Math.random() * (Number(armor) + 1));
    if (damageForUser > armorDefence) {
      let userHealth = userInfo.userInfo.health - damageForUser + armorDefence;
      updateUserInfo(userHealth, userInfo.userInfo.gold, 10);
      if (userHealth <= 0) {
        updateUserInfo(0, userInfo.userInfo.gold, 0);
        setshowDeathModal(true);
      }
    } else {
      updateUserInfo(userInfo.userInfo.health, userInfo.userInfo.gold, 10);
    }
    if (userInfo.userInfo.health <= 0) {
      updateUserInfo(0, userInfo.userInfo.gold, 0);
      setshowDeathModal(true);
    }
    if (damageForEnemy > enemyHealth) {
      getNewEnemy();
    } else {
      setEnemyBar(enemyHealth);
    }
  };
  // Main function on attack
  const handleHit = async () => {
    setMessage("");
    if (Object.entries(userInfo.weapon).length === 0) {
      setMessage(`You can't hit without weapon`);
    } else {
      if (userInfo.weapon[0].name === "Sword") {
        let chanceToBlockAttack = Math.floor(Math.random() * 100 + 1);
        if (chanceToBlockAttack <= 20) {
          setMessage("YOU BLOCKED THE ATTACK");
          let damageNumberForEnemy = userInfo.weapon[0].defence;
          let damageForEnemy = Math.floor(
            Math.random() * (Number(damageNumberForEnemy) + 1)
          );
          let enemyHealth = enemyBar - damageForEnemy;
          if (damageForEnemy > enemyHealth) {
            getNewEnemy();
          } else {
            setEnemyBar(enemyHealth);
            updateUserInfo(
              userInfo.userInfo.health,
              userInfo.userInfo.gold,
              10
            );
          }
          if (userInfo.userInfo.health <= 0) {
            updateUserInfo(0, userInfo.userInfo.gold, 0);
            setshowDeathModal(true);
          }
        } else {
          if (userInfo.armor.length > 0) {
            manageAttackWeaponAndArmor();
          } else {
            manageAttackOnlyWeapon();
          }
        }
      } else if (userInfo.weapon[0].name === "Bow") {
        let chanceToDoubleAttack = Math.floor(Math.random() * 100 + 1);
        if (chanceToDoubleAttack <= 30) {
          setMessage("YOU DOUBLED DAMAGE");
          let damageNumberForEnemy = userInfo.weapon[0].defence;
          let damageForEnemy = Math.floor(
            Math.random() * (Number(damageNumberForEnemy) + 1)
          );
          let doubledDamage = damageForEnemy * 2;
          let enemyHealth = enemyBar - doubledDamage;
          let damageNumberForUser = enemies[enemyNumber].damage;
          let damageForUser = Math.floor(
            Math.random() * (Number(damageNumberForUser) + 1)
          );
          let userHealth = userInfo.userInfo.health - damageForUser;
          if (damageForEnemy > enemyHealth) {
            getNewEnemy();
          } else {
            setEnemyBar(enemyHealth);
            updateUserInfo(userHealth, userInfo.userInfo.gold, 10);
          }
          if (userInfo.userInfo.health <= 0) {
            updateUserInfo(0, userInfo.userInfo.gold, 0);
            setshowDeathModal(true);
          }
        } else {
          if (userInfo.armor.length > 0) {
            manageAttackWeaponAndArmor();
          } else {
            manageAttackOnlyWeapon();
          }
        }
      } else if (userInfo.weapon[0].name === "Magic wand") {
        let chanceToHealOnAttack = Math.floor(Math.random() * 100 + 1);
        if (chanceToHealOnAttack <= 40) {
          if (userInfo.userInfo.health >= 90) {
            setMessage("YOU GOT +10 HEALTH");
            let userHealth = 100;
            updateUserInfo(userHealth, userInfo.userInfo.gold, 10);
          } else {
            setMessage("YOU GOT +10 HEALTH");
            let damageNumberForEnemy = userInfo.weapon[0].defence;
            let damageForEnemy = Math.floor(
              Math.random() * (Number(damageNumberForEnemy) + 1)
            );
            let enemyHealth = enemyBar - damageForEnemy;
            let userHealth = userInfo.userInfo.health + 10;
            if (damageForEnemy > enemyHealth) {
              getNewEnemy();
            } else {
              setEnemyBar(enemyHealth);
              updateUserInfo(userHealth, userInfo.userInfo.gold, 10);
            }
          }
          if (userInfo.userInfo.health <= 0) {
            updateUserInfo(0, userInfo.userInfo.gold, 0);
            setshowDeathModal(true);
          }
        } else {
          if (userInfo.armor.length > 0) {
            manageAttackWeaponAndArmor();
          } else {
            manageAttackOnlyWeapon();
          }
        }
      }
    }
  };
  // When user is dead and decide to pay me 1$ to get 100% health :)
  const handleGameRepeat = async () => {
    setshowDeathModal(false);
    const token = localStorage.getItem("game-auth");
     await fetch("https://react-arena-game.herokuapp.com/api/user/update", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        health: 100,
        gold: userInfo.userInfo.gold,
      }),
    });
    update();
  };

  return (
    <div>
      <Header text={"Arena"} />
      <div className="arena_container">
        <div className="player_container">
          <h4>{userInfo.userInfo.username}</h4>
          <img src={userInfo.userInfo.image} alt="" className={userAnimation} />
          <div className="health">
            {userInfo.userInfo.health}/100{" "}
            <img
              src="https://cdn3.iconfinder.com/data/icons/casino-2/256/Heart_Suit-512.png"
              alt=""
            />
            <div
              className="health_bar"
              style={{ width: userInfo.userInfo.health + "%" }}
            ></div>
          </div>
          <div className="inventory_container">
            {hasArmor ? (
              <div className="armor">
                <img
                  src={userInfo.armor[0].image}
                  alt=""
                  onClick={() => openInventoryModal("ARMOR")}
                />
              </div>
            ) : (
              <div
                className="armor"
                onClick={() => openInventoryModal("ARMOR")}
              >
                ARMOR
              </div>
            )}
            {hasWeapon ? (
              <div className="weapons">
                <img
                  src={userInfo.weapon[0].image}
                  alt=""
                  onClick={() => openInventoryModal("WEAPONS")}
                />
              </div>
            ) : (
              <div
                className="weapons"
                onClick={() => openInventoryModal("WEAPONS")}
              >
                WEAPONS
              </div>
            )}

            <div
              className="potions"
              onClick={() => openInventoryModal("POTIONS")}
            >
              POTIONS
            </div>
          </div>
        </div>
        <div className="buttons_container">
          <button onClick={handleHit}>ATTACK</button>
          <p>{message}</p>
        </div>
        <div className="enemy_container">
          {enemyNumber !== "" && (
            <div className="enemy_wrapper">
              <h4>{enemies[enemyNumber].name}</h4>
              <p>Damage: {enemies[enemyNumber].damage}</p>
              <img
                src={enemies[enemyNumber].image}
                alt=""
                className={enemyAnimation}
              />
            </div>
          )}
          <div className="bar_container">
            <p>
              {enemyBar}/100{" "}
              <img
                src="https://cdn3.iconfinder.com/data/icons/casino-2/256/Heart_Suit-512.png"
                alt=""
              />
            </p>
            <div className="health_bar" style={{ width: enemyBar + "%" }}></div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          onClick={() => setshowModal(false)}
          name={inventoryName}
          update={update}
          hasArmor={() => setHasArmor(true)}
          hasWeapon={() => sethasWeapon(true)}
          isInventory={true}
        />
      )}
      {showDeathModal && (
        <Modal
          onClick={() => setshowDeathModal(false)}
          onClick2={handleGameRepeat}
          text={`Buy or drink some potion! Or you can donate 1$ to Evelina's account and get 100% health :)`}
          userDead={true}
        />
      )}
    </div>
  );
}

export default Arena;
