import {Module} from '../core/module';

export class TimerModule extends Module {
  trigger() {
    super.trigger();
    document.body.classList.add('body');

    //Основа таймера
    document.body.innerHTML = `
      <div id="countdown">
        <div class="number">
          <span class="days time"></span>
          <span class="text">Days</span>
        </div>
        <div class="number">
          <span class="hours time"></span>
          <span class="text">Hours</span>
        </div>
        <div class="number">
          <span class="minutes time"></span>
          <span class="text">Minutes</span>
        </div>
        <div class="number">
          <span class="seconds time"></span>
          <span class="text">Seconds</span>
        </div>
      </div>
    `;

    function getTimeRemaining(endTime) {
      const t = Date.parse(endTime) - Date.parse(new Date().toString());
      const seconds = Math.floor((t / 1000) % 60);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }

    function initializeClock(id, endTime) {
      const clock = document.getElementById(id);
      const daysSpan = clock.querySelector('.days');
      const hoursSpan = clock.querySelector('.hours');
      const minutesSpan = clock.querySelector('.minutes');
      const secondsSpan = clock.querySelector('.seconds');

      function updateClock() {
        const time = getTimeRemaining(endTime);

        daysSpan.innerHTML = time.days.toString();
        hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);

        if (time.total <= 0) {
          clearInterval(timeInterval);
        }
      }

      updateClock();
      const timeInterval = setInterval(updateClock, 1000);
    }

    const deadline = 'December 31 2023';
    initializeClock('countdown', deadline);

    document.body.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
  }
}
