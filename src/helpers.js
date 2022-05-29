import db from "./db";

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

export const getPlayerPlaying = async () => {
  let player = await db.players.get({ playing: "yes" });
  console.log(player);
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

const checkWinner = (playerSelection, computerSelection) => {
  console.log(computerSelection.beats, playerSelection);
  if (computerSelection.beats === playerSelection) {
    return "computer";
  } else if (computerSelection.name === playerSelection) {
    return "check";
  } else {
    return "player";
  }
};

export const processSelection = (selection) => {
  const randomNumber = Math.floor(Math.random() * 3);

  const computerSelection = OPTIONS[randomNumber];
  return {
    isWinner: checkWinner(selection, computerSelection),
    computerSelection,
  };
};
