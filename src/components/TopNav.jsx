import "./topNav.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";

import { useNavigate } from "react-router-dom";

import { getPlayerPlaying, setNotPlaying } from "../helpers";
import { useMatch } from "react-router-dom";

const TopNav = () => {
  const { user, setUser, getCurrentUser } = useContext(UserContext);
  const [loosing, setLoosing] = useState(false);

  const navigate = useNavigate();
  const match = useMatch("/");
  useEffect(() => {
    if (user.name !== "") {
      user.score < 0 && setLoosing(true);
      user.score >= 0 && setLoosing(false);
      console.log(loosing);
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
      {match && <h4>Rock, paper, scissors</h4>}

      {user.name && (
        <h3 className="nav-name">
          <span className="material-icons">face</span>
          {user.name.toUpperCase()}
        </h3>
      )}
      {user.name && (
        <h3 className={`${loosing ? "loosing" : ""}`}>SCORE: {user.score}</h3>
      )}
      {user.name && (
        <button className="btn-exit" onClick={handleClick}>
          <span className="material-symbols-outlined">logout</span>
        </button>
      )}
    </nav>
  );
};

export default TopNav;
