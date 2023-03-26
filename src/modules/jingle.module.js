import { Module } from '../core/module';

export class JingleModule extends Module {
  trigger() {
    const  audio = new Audio();
    audio.src = '../media/mario_coin_sound.mp3';
    audio.autoplay = true;
  }
}
