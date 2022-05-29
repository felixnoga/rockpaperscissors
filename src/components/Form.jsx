import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPlayer } from "../helpers";
import { UserContext } from "../contexts/userContext";

import "./form.css";
import { getPlayerPlaying } from "../helpers";

const PlayerForm = () => {
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState({});
  const ctx = useContext(UserContext);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerPlaying = async () => {
      const current = await getPlayerPlaying();
      if (current) {
        setCurrentPlayer(current);
        ctx.setUser(current);
        navigate("/game");
      }
    };
    fetchPlayerPlaying();
  }, []);

  const handleInput = (e) => {
    setName(e.target.value);
    setError(false);
  };

  const handleClick = async () => {
    if (name.length < 4) {
      setError(true);
      return;
    }
    setError(false);
    const player = await createPlayer(name);

    ctx.setUser({
      id: player.id,
      name: player.name,
      score: player.score,
      playing: "yes",
    });
    setName("");
    navigate("/game", { state: { name, score: 0 } });
  };

  return (
    <>
      <span className="material-symbols-outlined logo">rocket_launch</span>
      <h2>Create New Player</h2>
      <input
        className={error ? "error" : ""}
        type="text"
        name="player-name"
        placeholder="Type your name..."
        onInput={handleInput}
        value={name}
      />
      {error && (
        <span className="span-error">
          Debes introducir más de 3 caracteres en el nombre
        </span>
      )}
      <button id="addPlayer" onClick={handleClick}>
        Play
      </button>
    </>
  );
};

export default PlayerForm;
