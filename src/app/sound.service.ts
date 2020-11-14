import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audioCtx = new (window['AudioContext'] || window['webkitAudioContext'])();

  constructor() { }

  sound(beatNumber, beats, stress, frequency) {

    const osc = this.audioCtx.createOscillator();
    const envelope = this.audioCtx.createGain();

    osc.frequency.value = (beatNumber % beats === 0 && stress) ? frequency + 200 : frequency;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, this.audioCtx.currentTime + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.02);

    osc.connect(envelope);
    envelope.connect(this.audioCtx.destination);

    osc.start(this.audioCtx.currentTime);
    osc.stop(this.audioCtx.currentTime + 0.03);
  }
}
