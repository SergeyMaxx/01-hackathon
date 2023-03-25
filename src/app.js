import './styles.css';
import { Message } from './modules/message.module';

const myMessage = new Message('message', 'Вызвать сообщение');

// для тестирования всплывающего сообщения
const messageButton = document.createElement('button');
messageButton.textContent = 'Показать сообщение';
messageButton.addEventListener('click', () => {
  myMessage.trigger('Заголовок сообщения', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit');
});
document.body.append(messageButton);