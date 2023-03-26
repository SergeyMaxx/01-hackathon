import { Module } from '../core/module';
import './message.css';

export class Message extends Module {
  #hideTimeout;
  #showTimeout;
  #removeTimeout;

  constructor(type, text) {
    super(type, text);

    this.#hideTimeout = 4000; // тайминг автоматического скрытия сообщения
    this.#showTimeout = 150; // тайминг из css на показ
    this.#removeTimeout = 300; // тайминг из css на скрытие

    this.timeoutID = undefined;
  }

  // приватный метод создания контейнера сообщений
  #createContainer() {
    const container = document.createElement('div');
    container.className = 'messages-container';

    return container;
  }

  // приватный метод создания сообщения
  #createMessage(messageTitle, messageText) {
    // само сообщение
    const message = document.createElement('div');
    message.className = 'message';

    // заголовок
    const title = document.createElement('div');
    title.className = 'message__title';
    title.textContent = messageTitle;

    // текст
    const text = document.createElement('div');
    text.className = 'message__text';
    text.textContent = messageText;

    message.append(title, text);

    // делегирование клика на сообщение
    document.addEventListener('click', (event) => {
      const
        { target } = event,
        message = target.closest('.message');

      if (message) {
        this.#removeMessage(message); // удаление сообщения
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
      this.#removeMessage(message);
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
    let container = document.querySelector('.messages-container');

    if (!container) {
      container = this.#createContainer();
    }

    return container;
  }

  // триггер по ТЗ
  trigger(title, text) {
    const
      container = this.#addContainer(), // получаем контейнер
      message = this.#createMessage(title, text); // получаем сообщение

    container.append(message); // добавляем сообщение в контейнер

    document.body.append(container); // добавляем контейнер в body

    this.#showMessage(message); // показываем сообщение
  }
}