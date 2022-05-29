import Dexie from "dexie";

const db = new Dexie("PlayersDatabase");
db.version(1).stores({
  players: "++id, name, playing",
});

export default db;
