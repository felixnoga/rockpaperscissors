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
      const { isWinner, computerSelection } = processSelection(playerSelection);
      setWinner(isWinner);
      setComputerSelection(computerSelection);
      setThinking(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [playerSelection]);

  const computeSelection = (selection) => {
    setThinking(true);
    setPlayerSelection(selection);
    console.log(playerSelection);
  };

  return (
    <>
      <button
        className={`piedra ${thinking ? "disabled" : ""}`}
        onClick={() => computeSelection("piedra")}
        disabled={thinking}
      ></button>
      <button
        className={`papel ${thinking ? "disabled" : ""}`}
        onClick={() => computeSelection("papel")}
        disabled={thinking}
      ></button>
      <button
        className={`tijeras ${thinking ? "disabled" : ""}`}
        onClick={() => computeSelection("tijeras")}
        disabled={thinking}
      ></button>

      {playerSelection && <h3>YOU SELECTED {playerSelection.toUpperCase()}</h3>}
      {computerSelection.name && !thinking && (
        <h3>COMPUTER SELECTED {computerSelection.name.toUpperCase()}</h3>
      )}
      {thinking && <h3>COMPUTER IS THINKING....</h3>}
      {winner && <h2>{winner}</h2>}
    </>
  );
};

export default Game;
