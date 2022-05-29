import db from "./db";

/**
 * Crea un jugador si no existe en la base de dator
 * @param  {String}   player       Nombre de jugador
 * @return {Promise}               Retorna el jugador si existe
 */

export const createPlayer = async (player) => {
  const dbPlayer = await getPlayer(player);
  if (!dbPlayer) {
    let id = await db.players.add({ name: player, score: 0, playing: "yes" });
    return { id, name: player, score: 0, playing: "yes" };
  } else {
    let id = dbPlayer.id;
    let updated = await db.players.update(id, { playing: "yes" });

    return dbPlayer;
  }
};

export const getPlayer = async (name) => {
  let player = await db.players.get({ name: name });
  return player;
};

export const setNotPlaying = async (id) => {
  let updated = await db.players.update(id, { playing: "no" });
  console.log(updated);
};

/**
 * Busca al jugador que está jugando (último jugador en utilizar la app)
 * @return {Promise}               Retorna el jugador si existe
 */

export const getPlayerPlaying = async () => {
  let player = await db.players.get({ playing: "yes" });
  return player;
};

const OPTIONS = [
  {
    name: "papel",
    beats: "piedra",
  },
  {
    name: "piedra",
    beats: "tijeras",
  },
  {
    name: "tijeras",
    beats: "papel",
  },
];

/**
 * Compara la selección del jugador y el ordenador
 * @param  {String}   playerSelection     String que contiene la selección del jugador
 * @param  {Objectg}  computerSelection   Objeto que contiene la selección del ordenador
 * @return {String}                       Retorna el ganador como cadena de texto
 */

export const checkWinner = (playerSelection, computerSelection) => {
  if (computerSelection.beats === playerSelection) {
    return "computer";
  } else if (computerSelection.name === playerSelection) {
    return "check";
  } else {
    return "player";
  }
};

/**
 * Computa la jugada comparando la selección del jugador y ordenador
 * @param  {String} selection String que contiene la selección del jugador
 * @return {Object}}           Retorna el ganador y la selección aleatoria del ordenador
 */

export const processSelection = (selection) => {
  const randomNumber = Math.floor(Math.random() * 3);

  const computerSelection = OPTIONS[randomNumber];
  return {
    isWinner: checkWinner(selection, computerSelection),
    computerSelection,
  };
};

/**
 * Retorna una cadena de texto formateada para mostrar en pantalla
 * @param  {String} winner String que contiene el winner
 * @return {String}        Retorna un string correctamente formateado para mostrar
 */

export const returnTheWinner = (winner) => {
  switch (winner.trim().toLowerCase()) {
    case "computer":
      return "COMPUTER WINS";
      break;
    case "player":
      return "YOU WIN";
      break;
    case "check":
      return "IT IS A CHECK";
      break;
  }
};

/**
 * Retorna la puntuación al pasarle como string el ganador
 * @param  {String} winner String que contiene el winner
 * @return {Number}        Retorna la puntuación para sumar al total
 */

export const computeScore = (winner) => {
  switch (winner) {
    case "computer":
      return -1;
      break;
    case "player":
      return 1;
      break;
    case "check":
      return 0;
      break;
  }
};
