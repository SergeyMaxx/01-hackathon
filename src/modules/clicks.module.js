import {Module} from '../core/module';

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
      figure.classList.add('figure');
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