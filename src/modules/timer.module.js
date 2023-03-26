import {Module} from '../core/module';

export class TimerModule extends Module {
  trigger() {
    super.trigger();
    const div = document.createElement('div')
    div.classList.add('body')
    const btn = document.createElement('button');
    btn.classList.add('press')
    btn.textContent = 'press';
    const timeEl = document.createElement('div');
    timeEl.classList.add('timer')
    timeEl.innerHtml = `<h3>Осталось <span id="time">00:00</span></h3>`;
    div.append(timeEl, btn)
    document.body.append(div);

    let time = '05';

    btn.addEventListener('click', () => {
      setInterval(decreaseTime, 1000);
      setTime(time);
      btn.classList.add('hide')
      timeEl.classList.add('timer-active')
    });

    function decreaseTime() {
      if (+time === 0) {
        timeEl.classList.add('hide')
      } else {
        let current = --time;
        if (current < 5) {
          current = `0${current}`;
        }
        timeEl.innerHTML = `00:${current}`;
      }
    }

    function setTime(value) {
      timeEl.innerHTML = `00:${value}`;
    }
  }
}