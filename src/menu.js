import {Menu} from './core/menu';
import {BackgroundModule} from './modules/background.module';
import {ClicksModule} from './modules/clicks.module';

export class ContextMenu extends Menu {
  #toggleMenu;
  #options;
  #backgroundModule;
  #clicksModule;

  constructor(selector) {
    super(selector);

    this.#toggleMenu = true;
    this.#backgroundModule = new BackgroundModule(' ', ' ');
    this.#clicksModule = new ClicksModule(' ', ' ');
    this.#options = [
      {text: 'Создать фигуру'},
      {text: 'Поменять цвет'},
      {text: 'Вызвать таймер'},
      {text: 'Вызвать сообщение'}
    ];
  }

  // отображение меню
  #showMenu(x, y) {
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

          break;
        case 'Поменять цвет':
          this.#backgroundModule.trigger();
          break;
        case 'Вызвать тайме':

          break;
        case 'Вызвать сообщение':
          this.#clicksModule.trigger();
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