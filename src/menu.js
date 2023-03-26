import {Menu} from './core/menu';
import {BackgroundModule} from './modules/background.module';
import {PokemonModule} from './modules/pokemon.module';
import {Message} from './modules/message.module';
import {TimerModule} from './modules/timer.module';
import {ShapeModule} from './modules/shape.module';

export class ContextMenu extends Menu {
  #toggleMenu;
  #options;
  #backgroundModule;
  #figure;
  #jingleModule;
  #message;
  #timer;

  constructor(selector) {
    super(selector);

    this.#toggleMenu = true;
    this.#backgroundModule = new BackgroundModule(' ', ' ');
    this.#figure = new ShapeModule(' ', ' ');
    this.#jingleModule = new PokemonModule(' ', ' ');
    this.#message = new Message(' ', ' ');
    this.#timer = new TimerModule(' ', ' ');
    this.#options = [
      {text: 'Создать фигуру'},
      {text: 'Поменять цвет'},
      {text: 'Вызвать таймер'},
      {text: 'Вызвать сообщение'},
      {text: 'Показать покемон'}
    ];
  }

  // отображение меню
  #showMenu(x, y) {
    const menuWidth = this.el.offsetWidth;
    const menuHeight = this.el.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // проверяем, выходит ли меню за границы экрана по горизонтали
    if (x + menuWidth > windowWidth) {
      x -= menuWidth;
    }

    // проверяем, выходит ли меню за границы экрана по вертикали
    if (y + menuHeight > windowHeight) {
      y -= menuHeight;
    }

    this.el.style.display = 'block';
    this.el.style.left = x + 'px';
    this.el.style.top = y + 'px';
  }

  // скрытие меню
  #hideMenu() {
    this.el.style.display = 'none';
  }

  // создаем сам элемент
  static #createElement(element, classes, content) {
    const newElement = document.createElement(element);
    newElement.className = classes;
    newElement.textContent = content;
    return newElement;
  }

  // добавляем обработчик правого клика на контейнер
  open() {
    super.open();
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
      if (this.#toggleMenu) {
        this.#options.forEach(i => {
          this.el.append(ContextMenu.#createElement('li', 'list-item', i.text));
        });
        this.#toggleMenu = !this.#toggleMenu;
      }
      this.#showMenu(e.pageX, e.pageY); // отображаем контекстное меню в месте правого клика
    });

    // добавляем обработчик клика на элементы меню
    this.el.addEventListener('click', ({target}) => {
      switch (target.textContent) {
        case 'Создать фигуру':
          this.#figure.trigger();
          break;
        case 'Поменять цвет':
          this.#backgroundModule.trigger();
          break;
        case 'Вызвать таймер':
          this.#timer.trigger();
          break;
        case 'Вызвать сообщение':
          this.#message.trigger('Я frontend разработчик', 'мой первый хакатон');
          break;
        case 'Показать покемон':
          this.#jingleModule.trigger();
          break;
        default:
          break;
      }
    });
  }

  close() {
    super.close();
    document.body.addEventListener('click', () => {
      this.#hideMenu(); // скрываем меню после выбора пункта
    });

    this.el.addEventListener('click', () => {
      this.#hideMenu(); // скрываем меню после выбора пункта
    });
  }
}