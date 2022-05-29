import React, { createContext, useState, useEffect, useReducer } from "react";
import { getPlayerPlaying } from "../helpers";
import db from "../db";
import userReducer from "./reducers/userReducer";

export const UserContext = createContext();

const initialState = { name: "", score: 0, playing: "no" };

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  const [state, dispatch] = useReducer(userReducer, initialState);

  const updateDBScore = async (payload) => {
    dispatch({ type: "UPDATE_SCORE", payload });
  };

  useEffect(() => {
    const fetchPlayerPlaying = async () => {
      const current = await getPlayerPlaying();
      if (current) {
        setUser(current);
      }
    };
    fetchPlayerPlaying();
  }, []);

  useEffect(() => {
    const updatePlayer = async () => {
      if (user.id) {
        let updated = await db.players.update(user.id, {
          score: user.score,
        });
      }
    };
    updatePlayer();
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, updateDBScore }}>
      {children}
    </UserContext.Provider>
  );
};
