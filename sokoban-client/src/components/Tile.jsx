import React from "react";
import "../App.css";

const Tile = ({ type }) => {
  const classMap = {
    "#": "wall",
    ".": "floor",
    P: "player",
    B: "block",
    G: "goal",
  };
  return <div className={`tile ${classMap[type] || "floor"}`}></div>;
};

export default Tile;
