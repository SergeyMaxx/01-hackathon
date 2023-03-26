import { Module } from '../core/module';
import { randomColor } from '../utils';

export class BackgroundModule extends Module {
  trigger() {
    document.body.style.background = randomColor();
  }
}
