import React from "react";
import GameGrid from "../components/GameGrid";

const GamePage = () => {
  return (
    <div>
      <h1>Sokoban Game</h1>
      <p>
        Tip: Use arrow keys to move the{" "}
        <span style={{ color: "blue", fontWeight: "bold" }}>Blue</span> block
        and place the{" "}
        <span style={{ color: "goldenrod", fontWeight: "bold" }}>Yellow</span>{" "}
        blocks on the{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>Green</span> ones
        !!
      </p>
      <GameGrid />
    </div>
  );
};

export default GamePage;
