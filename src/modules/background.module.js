import { Module } from '../core/module';

export class BackgroundModule extends Module {
  trigger() {
    document.body.style.background = `#${Math.random().toString().slice(11)}`;
  }
}