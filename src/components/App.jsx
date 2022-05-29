import "../styles.css";
import "./app.css";
import "animate.css";

import { getPlayerPlaying } from "../helpers";

import PlayerForm from "./Form";
import Game from "./Game";
import TopNav from "./TopNav";

import { UserContext } from "../contexts/userContext";

import { UserProvider } from "../contexts/userContext";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <UserProvider>
      <TopNav />
      <div className="container">
        <Routes>
          <Route path="/" element={<PlayerForm />} />
          <Route path="game" element={<Game />} />
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
