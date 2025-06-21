import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { defaultLevel } from "../data/levels";
import { movePlayer, checkWin } from "../utils/gameHelpers";

const GameGrid = () => {
  const [map, setMap] = useState(defaultLevel);
  const [won, setWon] = useState(false);

  const handleMove = (dx, dy) => {
    if (won) return;

    const updatedMap = movePlayer(map, dx, dy);
    setMap(updatedMap);
  };

  useEffect(() => {
    if (checkWin(map, defaultLevel)) setWon(true);
  }, [map]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp") handleMove(0, -1);
      if (e.key === "ArrowDown") handleMove(0, 1);
      if (e.key === "ArrowLeft") handleMove(-1, 0);
      if (e.key === "ArrowRight") handleMove(1, 0);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [map]);

  return (
    <div>
      {won && <h2 style={{ color: "lime" }}>🎉 You Win! 🎉</h2>}
      <div className="grid">
        {map.map((row, y) => (
          <div key={y} className="row">
            {row.map((cell, x) => (
              <Tile key={x} type={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
