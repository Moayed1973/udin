import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { movePlayer, checkWin } from "../utils/gameHelpers";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { defaultLevel } from "../data/levels";

const GameGrid = () => {
  const { user } = useAuth();
  const [map, setMap] = useState(defaultLevel);
  const [original, setOriginal] = useState(defaultLevel);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLevelId, setCurrentLevelId] = useState(null);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const res = await axios.get("/levels/latest");
        setMap(res.data.layout);
        setOriginal(res.data.layout);
        setCurrentLevelId(res.data._id);
      } catch (err) {
        setError("Couldn't load latest level. Using default.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, []);

  const handleMove = (dx, dy) => {
    if (!map || won) return;
    const updatedMap = movePlayer(map, dx, dy);
    if (JSON.stringify(updatedMap) !== JSON.stringify(map)) {
      setMap(updatedMap);
      setMoves((prev) => prev + 1);
    }
  };

  const submitScore = async () => {
    if (!user || !currentLevelId) return;
    try {
      await axios.post("/scores", {
        level: currentLevelId,
        moves,
        username: user.username,
      });
    } catch (err) {
      console.error("Failed to submit score:", err);
    }
  };

  const resetLevel = () => {
    setMap([...original]);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => {
    if (map && original && checkWin(map, original)) {
      setWon(true);
      submitScore();
    }
  }, [map]);

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          handleMove(0, -1);
          break;
        case "ArrowDown":
          handleMove(0, 1);
          break;
        case "ArrowLeft":
          handleMove(-1, 0);
          break;
        case "ArrowRight":
          handleMove(1, 0);
          break;
        case "r":
          resetLevel();
          break;
        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [map, won]);

  if (loading) return <div className="loading">Loading game...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Sokoban Puzzle</h2>
        <div className="game-stats">
          <span>Moves: {moves}</span>
          {user && <span>Player: {user.username}</span>}
        </div>
      </div>

      {won && (
        <div className="win-message">
          <h3>🎉 You Win! 🎉</h3>
          <p>Completed in {moves} moves!</p>
          <button onClick={resetLevel}>Play Again</button>
        </div>
      )}

      <div className={`game-grid ${won ? "won" : ""}`}>
        {map.map((row, y) => (
          <div key={y} className="grid-row">
            {row.map((cell, x) => (
              <Tile
                key={`${y}-${x}`}
                type={cell}
                isGoal={original[y][x] === "G" && cell !== "B"}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="game-controls">
        <button onClick={resetLevel}>Reset Level</button>
        <div className="instructions">
          <p>Use arrow keys to move</p>
          <p>Press 'R' to reset</p>
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
