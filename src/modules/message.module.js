import { Module } from '../core/module';
import { random } from '../utils';
import './message.css';

export class Message extends Module {
  #hideTimeout;
  #showTimeout;
  #removeTimeout;
  #messageArrays;

  constructor(type, text) {
    super(type, text);

    this.#hideTimeout = 4000; // тайминг автоматического скрытия сообщения
    this.#showTimeout = 150; // тайминг из css на показ
    this.#removeTimeout = 300; // тайминг из css на скрытие

    // массив сообщений
    this.#messageArrays = [
      {
        title: 'Противоположная точка зрения подразумевает',
        text: 'что ключевые особенности структуры проекта, превозмогая сложившуюся непростую экономическую ситуацию, описаны максимально подробно'
      },
      {
        title: 'Господа, начало повседневной работы',
        text: 'по формированию позиции не оставляет шанса для первоочередных требований'
      },
      {
        title: 'Безусловно, современная методология разработки',
        text: 'требует определения и уточнения вывода текущих активов!'
      },
      {
        title: 'Банальные, но неопровержимые выводы',
        text: 'а также представители современных социальных резервов освещают чрезвычайно интересные особенности картины в целом.'
      },
      {
        title: 'Однако конкретные выводы',
        text: 'разумеется, преданы социально-демократической анафеме!'
      },
      {
        title: 'Учитывая ключевые сценарии поведения',
        text: 'понимание сути ресурсосберегающих технологий обеспечивает широкому кругу (специалистов) участие в формировании укрепления моральных ценностей.'
      },
      {
        title: 'А также активно развивающиеся страны третьего мира',
        text: 'освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, ассоциативно распределены по отраслям.'
      }
    ];
  }

  // приватный метод создания контейнера сообщений
  #createContainer() {
    const container = document.createElement('div');
    container.className = 'messages-container';

    return container;
  }

  // приватный метод создания сообщения
  #createMessage({ title, text }) {
    // само сообщение
    const message = document.createElement('div');
    message.className = 'message';

    // заголовок
    const messageTitle = document.createElement('div');
    messageTitle.className = 'message__title';
    messageTitle.textContent = title;

    // текст
    const messageText = document.createElement('div');
    messageText.className = 'message__text';
    messageText.textContent = text;

    message.append(messageTitle, messageText);

    // делегирование клика на сообщение
    document.addEventListener('click', (event) => {
      const
        { target } = event,
        messageItem = target.closest('.message');

      if (messageItem) {
        this.#removeMessage(messageItem); // удаление сообщения
      }
    });

    return message;
  }

  // приватный метод показа сообщения
  #showMessage(message) {
    setTimeout(() => {
      // пришлось засунуть добавление класса сюда, поскольку вне setTimeout css анимация не срабатывает
      // не понятен этот момент
      message.classList.add('active');
      this.#hideMessage(message);
    }, this.#showTimeout);
  }

  // приватный метод скрытия сообщения
  #hideMessage(message) {
    setTimeout(() => {
      message.classList.remove('active');
      this.#removeMessage(message, true);
    }, this.#hideTimeout);
  }

  // приватный метод удаления сообщения
  #removeMessage(message, flagSetTimeout) {
    if (!flagSetTimeout) {
      message.remove();
    } else {
      setTimeout(() => {
        message.remove();
      }, this.#removeTimeout);
    }
  }

  // приватный метод добавления контейнера сообщений
  #addContainer() {
    // ищем контейнер на странице
    let container = document.querySelector('.messages-container');

    // если его нет - создаем
    if (!container) {
      container = this.#createContainer();
    }

    return container;
  }

  // триггер по ТЗ
  trigger() {
    const
      container = this.#addContainer(), // получаем контейнер

      // получаем случайно выбранное сообщение из массива
      messageFromArray = this.#messageArrays[random(0, this.#messageArrays.length - 1)],

      message = this.#createMessage(messageFromArray); // получаем сообщение

    // добавляем сообщение в контейнер
    container.append(message);

    // добавляем контейнер в body
    document.body.append(container);

    // показываем сообщение
    this.#showMessage(message);
  }
}