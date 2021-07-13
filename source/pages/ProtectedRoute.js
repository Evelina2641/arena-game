import React, { useContext, useEffect } from "react";
import Login from "./Login";
import { AuthenticationContext } from "../App";
import GameWindow from "./GameWindow";

function ProtectedRoute({ updateLoaded }) {
  const authentication = useContext(AuthenticationContext);

  useEffect(() => {
    if (localStorage.getItem("game-auth")) {
      authentication.setAuthenticated(localStorage.getItem("game-auth"));
    }
  }, [authentication]);
  if (localStorage.getItem("game-auth")) {
    return <GameWindow updateLoaded={updateLoaded} />;
  } else {
    return <Login />;
  }
}

export default ProtectedRoute;
