const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

app.use(express.static("public"));

let players = {};
let readyPlayers = new Set();
let gameInProgress = false;
let gameStartTime = null;

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  players[socket.id] = { taps: 0, ready: false };

  socket.on("ready", () => {
    players[socket.id].ready = true;
    readyPlayers.add(socket.id);

    io.emit("playerReadyUpdate", [...readyPlayers]);

    if (
      Object.keys(players).length >= 2 &&
      readyPlayers.size === Object.keys(players).length &&
      !gameInProgress
    ) {
      startGame();
    }
  });

  socket.on("tap", () => {
    if (gameInProgress) {
      players[socket.id].taps += 1;
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete players[socket.id];
    readyPlayers.delete(socket.id);

    if (Object.keys(players).length < 2) {
      io.emit("waitingForPlayers");
    }
  });
});

function startGame() {
  gameInProgress = true;
  gameStartTime = Date.now() + 3000;

  io.emit("startGame", { startTime: gameStartTime });

  setTimeout(() => {
    endGame();
  }, 15000 + 3000);
}

function endGame() {
  gameInProgress = false;

  const scores = Object.entries(players).map(([id, data]) => ({
    id,
    taps: data.taps,
  }));

  const winner = scores.sort((a, b) => b.taps - a.taps)[0];

  io.emit("gameOver", {
    winnerId: winner?.id,
    taps: winner?.taps,
    scores,
  });

  for (let id in players) {
    players[id].taps = 0;
    players[id].ready = false;
  }
  readyPlayers.clear();
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
