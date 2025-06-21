# 🎮 Sokoban Game (Frontend)

A Sokoban puzzle game built with Vite + React. The player can move in four directions, push blocks, and complete levels by placing all blocks on goal tiles. The project is modular and ready for backend expansion (user auth, score tracking, level management).

---

## 📁 Project Structure

```bash
src/
├── components/       # Game UI components (Tile, Grid)
├── data/             # Game level definitions
├── pages/            # Page-level views
├── utils/            # Game logic helpers (move, win check)
├── App.jsx           # Main app component with routing
├── main.jsx          # Vite/React entry point
├── App.css           # Basic styling
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js > 17
- npm > 8

<!-- --- -->

**Install:**

```bash
npm intsall
```

**Install:**

```bash
npm run dev
```

---

**Port: http://localhost:3000**

## 🎮 Game Rules

- Move with arrow keys.
- Push blocks (B) onto goal tiles (G).
- Win the level when all goals are covered by blocks.
- You can only push one block at a time.
- You cannot pull or push multiple blocks in a row.

## ✅ Features

- Simple level loading from JSON.
- Pure grid-based logic for movement and win detection.
- Modular game logic for future unit testing or backend use.
- Win message appears when the level is completed.

## Future considertaions

- Add user registration/login (JWT-based)
- Admin role to create new puzzles
- Leaderboard tracking best scores per level
- Multiple levels + progress saving
