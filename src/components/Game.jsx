import "./game.css";
import { processSelection, returnTheWinner, computeScore } from "../helpers";
import { UserContext } from "../contexts/userContext";
import { useState, useEffect, useRef, useContext } from "react";
import db from "../db";

const Game = ({ updateName }) => {
  const [thinking, setThinking] = useState(false);
  const [computerSelection, setComputerSelection] = useState({});
  const [playerSelection, setPlayerSelection] = useState("");
  const [winner, setWinner] = useState("");
  const [player, setPlayer] = useState({});

  const ctx = useContext(UserContext);

  const initialRender = useRef(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const updatePlayerScore = async (id, newScore) => {
        await db.players.update(id, { score: newScore });
      };
      const { selected } = playerSelection;
      const { isWinner, computerSelection } = processSelection(selected);
      setWinner(returnTheWinner(isWinner));
      setComputerSelection(computerSelection);

      if (player.id) {
        let newScore = computeScore(isWinner);
        ctx.setUser({ ...ctx.user, score: ctx.user.score + newScore });
        updatePlayerScore(player.id, ctx.user.score + newScore);
      }

      setThinking(false);
    }, 1000);
  }, [playerSelection]);

  useEffect(() => {
    setPlayer(ctx.user);
  }, [ctx.user]);

  const computeSelection = (e) => {
    setThinking(true);
    initialRender.current = false;
    setPlayerSelection({ selected: e.target.dataset.selection });
  };

  return (
    <>
      <button
        className={`piedra ${thinking ? "disabled" : ""}`}
        data-selection="piedra"
        onClick={computeSelection}
        disabled={thinking}
      ></button>
      <button
        className={`papel ${thinking ? "disabled" : ""}`}
        data-selection="papel"
        onClick={computeSelection}
        disabled={thinking}
      ></button>
      <button
        className={`tijeras ${thinking ? "disabled" : ""}`}
        data-selection="tijeras"
        onClick={computeSelection}
        disabled={thinking}
      ></button>

      {playerSelection && (
        <h3>YOU SELECTED {playerSelection.selected.toUpperCase()}</h3>
      )}
      {computerSelection.name && !thinking && !initialRender.current && (
        <h3>COMPUTER SELECTED {computerSelection.name.toUpperCase()} </h3>
      )}
      {thinking && <h3>COMPUTER IS THINKING....</h3>}
      {!thinking && winner && !initialRender.current && <h2>{winner}</h2>}
    </>
  );
};

export default Game;
