"use strict";

const player1NumberScore = document.getElementById("score--0");
const player2NumberScore = document.getElementById("score--1");
const player1CurrentScore = document.getElementById(`current--0`);
const player2CurrentScore = document.getElementById(`current--1`);
const player1 = document.querySelector(`.player--0`);
const player2 = document.querySelector(`.player--1`);
const diceImage = document.querySelector(".dice");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnResetTheGame = document.querySelector(".btn--new");

let currentScore, activePlayer, scores, game;
const resetGame = function () {
  player1NumberScore.textContent = 0;
  player2NumberScore.textContent = 0;
  diceImage.classList.add("hidden");
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  game = true;
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
};
resetGame();
const diceImageDisplay = function (diceimage) {
  diceImage.src = diceimage;
};
const currentScoreDisplay = function (currentScore) {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};
const switchPlayer = function () {
  currentScore = 0;
  currentScoreDisplay(currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};

btnRollDice.addEventListener("click", function () {
  if (game) {
    const diceNumber = Math.trunc(Math.random() * 6 + 1);
    diceImageDisplay(`dice-${diceNumber}.png`);
    diceImage.classList.remove("hidden");
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      currentScoreDisplay(currentScore);
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (game) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      game = false;
      diceImage.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});
btnResetTheGame.addEventListener("click", resetGame);
