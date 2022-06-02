'use strict';

// Selecting elements
const playerZeroElement = document.querySelector('.player--0');
const playerOneElement = document.querySelector('.player--1');
const scoreZeroElement = document.getElementById('score--0');
const scoreOneElement = document.getElementById('score--1');
const currentZeroElement = document.getElementById('current--0')
const currentOneElement = document.getElementById('current--1')
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerZeroName = document.getElementById('name--0');
const playerOneoName = document.getElementById('name--1');


let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreZeroElement.textContent = 0;
    scoreOneElement.textContent = 0;
    currentZeroElement.textContent = 0;
    currentOneElement.textContent = 0;
    playerZeroName.textContent = 'Player 1';
    playerOneoName.textContent = 'Player 2';

    diceElement.classList.add('hidden');
    playerZeroElement.classList.remove('player--winner');
    playerOneElement.classList.remove('player--winner');
    playerZeroElement.classList.add('player--active');
    playerOneElement.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerZeroElement.classList.toggle('player--active');
    playerOneElement.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Genetating a random dice roll 1-6
        const dice = Math.trunc(Math.random() * 6 + 1)

        // 2. Display the dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        //3. Check for a rolled one
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if players score is >=100
        if (scores[activePlayer] >= 20) {
            // Finish the game
            playing = false;
            diceElement.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            if (activePlayer === 0) {
                document.getElementById('name--0').textContent = 'WINNER';
                document.getElementById('name--1').textContent = 'LOSER';
            } else {
                document.getElementById('name--0').textContent = 'LOSER';
                document.getElementById('name--1').textContent = 'WINNER';
            }
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);


