import { Module } from '../core/module';

export class ClicksModule extends Module {
  trigger() {
    var audio = new Audio();
    audio.src = '../media/mario_coin_sound.mp3';
    audio.autoplay = true;
  }
}
