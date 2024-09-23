'use strict';

// Elements :
const userGuess = document.querySelector('.inp');
const answerEl = document.querySelector('.ans');
const messageEl = document.querySelector('.msg');
const inpBoxEl = document.querySelector('.container');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');

// Buttons :
const enter = document.querySelector('.inp--btn');
const again = document.querySelector('.btn--again');
const resetHigscore = document.querySelector('.btn--info');

// Variables :
let Guess;
let score;
let highscore;
const init = function () {
  Guess = Math.floor(Math.random() * 20 + 1);
  score = 10;
  highscore = localStorage.getItem('Highscore')
    ? +localStorage.getItem('Highscore')
    : 0;
  highscoreEl.textContent = highscore;
  scoreEl.textContent = score;
};
init();

// Game Logic :
enter.addEventListener('click', function (e) {
  e.preventDefault();
  const endGame = function () {
    enter.setAttribute('disabled', '');
    userGuess.setAttribute('disabled', '');
    enter.style.opacity = 0.5;
    userGuess.style.opacity = 0.5;

    messageEl.style.color = 'var(--color-light)';
    answerEl.textContent = Guess;
  };

  if (!+userGuess.value) {
    messageEl.textContent = 'Please Enter a Number !';
  } else if (+userGuess.value !== Guess) {
    messageEl.textContent =
      +userGuess.value > Guess ? 'Guess Low Number' : 'Guess High Number';
    score--;
    scoreEl.textContent = score;
  } else {
    messageEl.textContent = 'You Win !';
    messageEl.parentElement.style.background = 'lightgreen';
    scoreEl.textContent = score;
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
      localStorage.setItem('Highscore', highscore);
    }
    endGame();
  }
  if (score <= 0) {
    messageEl.innerHTML = `You Lost, Correct Answer Was <i class="fa-solid fa-arrow-turn-up icon uparr"></i>`;
    messageEl.parentElement.style.background = 'lightcoral';
    endGame();
  }
});

// Again Button Functionality :
const againFn = function () {
  {
    init();
    messageEl.textContent = 'Start !';
    messageEl.style.color = 'var(--color-dark)';
    messageEl.parentElement.style.background = 'var(--color-light)';

    answerEl.innerHTML = '<i class="fa-solid fa-question">';
    userGuess.value = ' ';

    enter.removeAttribute('disabled');
    userGuess.removeAttribute('disabled');
    enter.style.opacity = 1;
    userGuess.style.opacity = 1;
  }
};
again.addEventListener('click', againFn);

// Reset HighScore :
resetHigscore.addEventListener('click', function (e) {
  console.log('Old Highscore Reseted !');
  localStorage.clear();
  again();
});
