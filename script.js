'use strict';
// const score0 = document.querySelector('#score--0');
// const score1 = document.querySelector('#score--1');

//selecting elements
const score0El = document.getElementById('score--0'); //its faster than querySelector specialy when selecting multiple IDs
const score1El = document.getElementById('score--1');
const current0E0 = document.getElementById('current--0');
const current0El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');


score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('.hidden');

let scores, currentScore, activePlayer, playing;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Starting conditions
const init = function () {
  playing = true;
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;

  player0EL.classList.add('player--active');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player1EL.classList.remove('player--active');
  diceEl.classList.remove('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0E0.textContent = 0;
  current0El.textContent = 0;
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1) generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // 1 to 6

    //2) Display dice

    diceEl.classList.remove('.hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);

    //3) Check for rolled 1 : if true  , switch to next player
    if (dice != 1) {
      //add die to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if the player's score >= 100
    //finish the game with the active player winner
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //3. switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
