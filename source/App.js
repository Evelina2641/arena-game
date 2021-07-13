import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
// Pages
import ProtectedRoute from "./pages/ProtectedRoute";
import Registration from "./pages/Registration";
import Shop from "./pages/Shop";
import Inventory from "./pages/Inventory";
import Arena from "./pages/Arena";
import LeaderBoard from "./pages/LeaderBoard";
import PlayerDetail from "./pages/PlayerDetail";
import ProfileEdit from "./pages/ProfileEdit";

export const AuthenticationContext = React.createContext();
export const UserInfoContext = React.createContext();

function App() {
  // State
  const [authenticated, setAuthenticated] = useState("");
  const [userInfo, setuserInfo] = useState({
    image: "",
    health: "",
    gold: "",
    inventory: [],
    username: "",
  });
  const [weapon, setWeapon] = useState({});
  const [armor, setArmor] = useState({});
  const [loaded, setLoaded] = useState(false);

  //Effect
  useEffect(() => {
    if (localStorage.getItem("game-auth")) {
      setAuthenticated(localStorage.getItem("game-auth"));
      fetchData();
    }
  }, []);
  async function fetchData() {
    try {
      let token = localStorage.getItem("game-auth");
      let response = await fetch("https://react-arena-game.herokuapp.com/api/user/game", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      let user = await response.json();
      setLoaded(true);
      setuserInfo({
        image: user.image,
        health: user.health,
        gold: user.gold,
        inventory: user.inventory,
        username: user.username,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="App">
      <AuthenticationContext.Provider
        value={{ authenticated, setAuthenticated }}
      >
        <UserInfoContext.Provider
          value={{ userInfo, setuserInfo, weapon, setWeapon, armor, setArmor }}
        >
          <Router>
            <Switch>
              <Route exact path="/">
                <ProtectedRoute updateLoaded={loaded} />
              </Route>
              <Route path="/registration">
                <Registration />
              </Route>
              <Route path="/shop">
                <Shop update={fetchData} />
              </Route>
              <Route path="/inventory">
                <Inventory update={fetchData} />
              </Route>
              <Route path="/arena">
                <Arena update={fetchData} />
              </Route>
              <Route path="/leaders-board">
                <LeaderBoard />
              </Route>
              <Route path="/user/:id">
                <PlayerDetail />
              </Route>
              <Route path="/edit-profile">
                <ProfileEdit update={fetchData} />
              </Route>
            </Switch>
          </Router>
        </UserInfoContext.Provider>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;
