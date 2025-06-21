const socket = io();
let tapCount = 0;
let gameStarted = false;

const readyBtn = document.getElementById("readyBtn");
const waiting = document.getElementById("waiting");
const gameDiv = document.getElementById("game");
const timerSpan = document.getElementById("timer");
const tapCountSpan = document.getElementById("tapCount");
const winnerDiv = document.getElementById("winner");

readyBtn.addEventListener("click", () => {
  socket.emit("ready");
  readyBtn.disabled = true;
  readyBtn.innerText = "Waiting...";
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && gameStarted) {
    tapCount++;
    tapCountSpan.innerText = tapCount;
    socket.emit("tap");
  }
});

socket.on("startGame", ({ startTime }) => {
  const delay = startTime - Date.now();

  setTimeout(() => {
    startCountdown(15);
    tapCount = 0;
    tapCountSpan.innerText = "0";
    gameDiv.style.display = "block";
    winnerDiv.innerText = "";
    gameStarted = true;
  }, delay);
});

socket.on("gameOver", ({ winnerId, taps, scores }) => {
  gameStarted = false;
  const me = socket.id;
  const msg =
    winnerId === me ? "You won!" : `Player ${winnerId} won with ${taps} taps!`;
  winnerDiv.innerText = msg;
  readyBtn.disabled = false;
  readyBtn.innerText = "I'm Ready";
  gameDiv.style.display = "none";
});

function startCountdown(seconds) {
  let timeLeft = seconds;
  timerSpan.innerText = timeLeft;
  const interval = setInterval(() => {
    timeLeft--;
    timerSpan.innerText = timeLeft;
    if (timeLeft <= 0) clearInterval(interval);
  }, 1000);
}
