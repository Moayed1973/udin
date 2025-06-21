import { useState } from "react";
import Tile from "./Tile";
import axios from "../api/axiosInstance";

const defaultEmptyLevel = [
  ["#", "#", "#", "#", "#"],
  ["#", ".", ".", ".", "#"],
  ["#", ".", ".", ".", "#"],
  ["#", ".", ".", ".", "#"],
  ["#", "#", "#", "#", "#"],
];

export default function PuzzleForm() {
  const [grid, setGrid] = useState(defaultEmptyLevel);
  const [selectedTile, setSelectedTile] = useState("P");
  const [levelName, setLevelName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tileTypes = [
    { char: "#", name: "Wall" },
    { char: ".", name: "Floor" },
    { char: "P", name: "Player" },
    { char: "B", name: "Box" },
    { char: "G", name: "Goal" },
  ];

  const handleTileClick = (y, x) => {
    const newGrid = [...grid];
    newGrid[y][x] = selectedTile;
    setGrid(newGrid);
  };

  const resizeGrid = (rows, cols) => {
    const newGrid = Array(rows)
      .fill()
      .map((_, y) =>
        Array(cols)
          .fill()
          .map((_, x) =>
            y < grid.length && x < grid[0].length ? grid[y][x] : "#"
          )
      );
    setGrid(newGrid);
  };

  const handleSubmit = async () => {
    if (!levelName.trim()) return alert("Please enter a level name");
    if (!grid.some((row) => row.includes("P")))
      return alert("Level needs a player (P)");
    if (!grid.some((row) => row.includes("G")))
      return alert("Level needs at least one goal (G)");
    if (!grid.some((row) => row.includes("B")))
      return alert("Level needs at least one box (B)");

    setIsSubmitting(true);
    try {
      await axios.post("/levels", {
        name: levelName,
        layout: grid,
      });
      alert("Level saved successfully!");
      setGrid(defaultEmptyLevel);
      setLevelName("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save level");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="puzzle-creator">
      <h2>Level Designer</h2>

      <div className="editor-controls">
        <div className="tile-selector">
          <h4>Select Tile Type:</h4>
          {tileTypes.map((tile) => (
            <button
              key={tile.char}
              className={`tile-option ${
                selectedTile === tile.char ? "active" : ""
              }`}
              onClick={() => setSelectedTile(tile.char)}
            >
              <Tile type={tile.char} />
              <span>{tile.name}</span>
            </button>
          ))}
        </div>

        <div className="grid-controls">
          <h4>Grid Size:</h4>
          <div>
            Rows:
            <input
              type="number"
              min="5"
              max="15"
              value={grid.length}
              onChange={(e) =>
                resizeGrid(Number(e.target.value), grid[0].length)
              }
            />
            Cols:
            <input
              type="number"
              min="5"
              max="15"
              value={grid[0].length}
              onChange={(e) => resizeGrid(grid.length, Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="grid-editor">
        {grid.map((row, y) => (
          <div key={y} className="grid-row">
            {row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className="grid-cell"
                onClick={() => handleTileClick(y, x)}
              >
                <Tile type={cell} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="form-footer">
        <input
          type="text"
          placeholder="Level name"
          value={levelName}
          onChange={(e) => setLevelName(e.target.value)}
          required
        />
        <button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Level"}
        </button>
      </div>
    </div>
  );
}
