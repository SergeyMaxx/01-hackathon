import {Module} from '../core/module';


export class ClicksModule extends Module {
  hide() {
    const wrap = document.querySelector('body');
    wrap.innerHTML = `
        <div class="screen">
        <h1>Aim Training</h1>
        <a href="#" class="start" id="start">Начать игру</a>
        </div>

        <div class="screen">
        <h1>Выберите время</h1>
        <ul class="time-list" id="time-list">
            <li>
            <button class="time-btn" data-time="10">
                10 сек
            </button>
            </li>
            <li>
            <button class="time-btn" data-time="20">
                20 сек
            </button>
            </li>
            <li>
            <button class="time-btn" data-time="30">
                30 сек
            </button>
            </li>
            <li>
            <button class="time-btn" data-time="60">
                60 сек
            </button>
            </li>
        </ul>
        </div>

        <div class="screen">
        <h3>Осталось <span id="time">00:00</span></h3>
        <div class="board" id="board"></div>

        </div>
       `;
  }

  trigger() {
    const startBtn = document.querySelector('#start');
    const screens = document.querySelectorAll('.screen');
    const timeList = document.querySelector('#time-list');
    const timeEl = document.querySelector('#time');
    const board = document.querySelector('#board');
    const colors = ['red', 'blue', 'orange', 'purple'];
    const figureClass = ['circle', 'square', 'rectangle', 'oval'];
    const figure = document.createElement('div');
    let time = 0, score = 0;

    startBtn.addEventListener('click', (event) => {
      event.preventDefault();
      screens[0].classList.add('up');
    });

    timeList.addEventListener('click', event => {
      if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
      }
    });


    board.addEventListener('click', event => {
      if (event.target.classList.contains('figure')) {
        score++;
        event.target.remove();
        createFigure();
      }
    });

    function startGame() {
      setInterval(decreaseTime, 1000);
      createFigure();
      setTime(time);
    }

    function decreaseTime() {
      if (time === 0) {
        finishGame();
      } else {
        let current = --time;
        if (current < 10) {
          current = `0${current}`;
        }
        timeEl.innerHTML = `00:${current}`;
      }
    }

    function setTime(value) {
      timeEl.innerHTML = `00:${value}`;
      timeEl.style.color = 'red';
    }

    function finishGame() {
      timeEl.parentNode.classList.add('hide');
      board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>
            <a href="#" class="restart" id="restart">Вернуться на главную страницу</a>`;
      //board.innerHTML = ``
      const restartBtn = document.querySelector('#restart');
      restartBtn.addEventListener('click', (event) => {
        window.location.reload();
      });
    }

    function createFigure() {
      figure.classList = 'figure';
      const size = getRandomNumber(50, 190);
      const color = getRandomColor();
      let randFigure = getRandomFigure();
      figure.classList.add(randFigure);
      if ((randFigure === 'circle') || (randFigure === 'square')) {
        figure.style.width = `${size}px`;
        figure.style.height = `${size}px`;
        console.log(randFigure);
      } else {
        figure.style.width = `${size * 2}px`;
        figure.style.height = `${size}px`;
        console.log(randFigure);
      }

      const {x, y} = getRandomLocation();
      figure.style.top = `${y}px`;
      figure.style.left = `${x}px`;
      figure.style.backgroundColor = color;
      board.append(figure);
    }

    function getRandomNumber(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    function getRandomColor() {
      const index = Math.floor(Math.random() * colors.length);
      return colors[index];
    }

    function getRandomFigure() {
      const index = Math.floor(Math.random() * figureClass.length);
      return figureClass[index];
    }

    function getRandomLocation() {
      const {width, height} = board.getBoundingClientRect();
      const x = Math.random() * (width - 400) + 100;
      const y = Math.random() * (height - 400) + 100;
      return {x, y};
    }
  }
}


/// 2 Вариант
export class ClicksModule2 extends Module {
  trigger() {
    const figure = document.createElement('div');
    const board = document.querySelector('body');
    const colors = ['red', 'blue', 'orange', 'purple'];
    const figureClass = ['circle', 'square', 'rectangle', 'oval'];

    function getRandomNumber(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    function getRandomColor() {
      const index = Math.floor(Math.random() * colors.length);
      return colors[index];
    }

    function getRandomFigure() {
      const index = Math.floor(Math.random() * figureClass.length);
      return figureClass[index];
    }

    function getRandomLocation() {
      const {width, height} = board.getBoundingClientRect();
      const x = Math.random() * (width - 400) + 100;
      const y = Math.random() * (height - 400) + 100;
      return {x, y};
    }

    function createFigure() {
      figure.classList = 'figure';
      const size = getRandomNumber(50, 170);
      const color = getRandomColor();
      let randFigure = getRandomFigure();
      figure.classList.add(randFigure);
      if ((randFigure === 'circle') || (randFigure === 'square')) {
        figure.style.width = `${size}px`;
        figure.style.height = `${size}px`;
      } else {
        figure.style.width = `${size * 2}px`;
        figure.style.height = `${size}px`;
      }
      const {x, y} = getRandomLocation();
      figure.style.top = `${y}px`;
      figure.style.left = `${x}px`;
      figure.style.backgroundColor = color;
      board.append(figure);
    }

    board.addEventListener('click', event => {
      if (event.target.classList.contains('figure')) {
        event.target.remove();
      }
    });
    createFigure();
  }
}