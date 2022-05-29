import "./game.css";
import { processSelection } from "../helpers";
import { useState, useEffect } from "react";

const Game = ({ updateName }) => {
  const [thinking, setThinking] = useState(false);
  const [computerSelection, setComputerSelection] = useState({});
  const [playerSelection, setPlayerSelection] = useState("");

  const [winner, setWinner] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const { selected } = playerSelection;
      const { isWinner, computerSelection } = processSelection(selected);
      setWinner(isWinner);
      setComputerSelection(computerSelection);
      setThinking(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [playerSelection]);

  const computeSelection = (e) => {
    setThinking(true);
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
      {computerSelection.name && !thinking && (
        <h3>COMPUTER SELECTED {computerSelection.name.toUpperCase()}</h3>
      )}
      {thinking && <h3>COMPUTER IS THINKING....</h3>}
      {winner && <h2>{winner}</h2>}
    </>
  );
};

export default Game;
