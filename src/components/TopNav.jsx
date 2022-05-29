import "./topNav.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";

import { useNavigate } from "react-router-dom";

import { getPlayerPlaying, setNotPlaying } from "../helpers";

const TopNav = () => {
  const { user, setUser, getCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      return;
    } else {
      navigate("/");
    }
  }, [user]);

  const handleClick = async () => {
    const id = user.id;
    await setNotPlaying(id);
    setUser({});
    navigate("/");
  };
  return (
    <nav>
      <h4>Rock, paper, scissors</h4>
      {user.name && <h4 className="nav-name">{user.name.toUpperCase()}</h4>}
      {user.name && <h5>SCORE: {user.score}</h5>}
      {user.name && (
        <button className="btn-exit" onClick={handleClick}>
          SALIR
        </button>
      )}
    </nav>
  );
};

export default TopNav;
