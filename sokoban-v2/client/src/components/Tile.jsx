import React from "react";
import "../App.css";

const Tile = ({ type, isGoal }) => {
  const tileClasses = {
    "#": "wall",
    ".": isGoal ? "goal" : "floor",
    P: "player",
    B: isGoal ? "block-on-goal" : "block",
    G: "goal",
  };

  return (
    <div className={`tile ${tileClasses[type] || "floor"}`}>
      {type === "P" && <div className="player-icon">↑</div>}
      {type === "B" && isGoal && <div className="block-check">✓</div>}
    </div>
  );
};

export default Tile;
