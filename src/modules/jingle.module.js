import { Module } from '../core/module';

export class JingleModule extends Module {
  trigger() {
    var audio = new Audio();
    audio.src = '../media/mario_coin_sound.mp3';
    audio.autoplay = true;
  }
}
