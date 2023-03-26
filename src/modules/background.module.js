import { Module } from '../core/module';

export class BackgroundModule extends Module {
  trigger() {
    document.body.style.background = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}