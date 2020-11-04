import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-mertronome';
  timer = null;
  audio = new Audio('../assets/metro_frank/metro_1.wav');
  audioStress = new Audio('../assets/metro_frank/metro_other.wav');
  stress = false;
  bpm = 60;
  beats = 2;
  frequency = 800;
  switchClass = false;
  worker: Worker;
  private audioCtx = new (window['AudioContext'] || window['webkitAudioContext'])();
  constructor() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker('./app.worker', { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data.command}`);
        this.sound(data.count, data.beats)
      };
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  start(bpm, beats) {
    this.worker.postMessage({
      command: 'start',
      bpm: bpm,
      beats: beats,
    });
    // this.stop();
    // this.timer = this.metronome_engine(bpm, beats);
  }

  stop() {
    this.worker.postMessage({
      command: 'stop'
    });
    // return clearInterval(this.timer);
  }

  sound(beatNumber, beats) {
    console.log(beatNumber, beatNumber % beats);
    const osc = this.audioCtx.createOscillator();
    const envelope = this.audioCtx.createGain();

    osc.frequency.value = (beatNumber % beats === 1 && this.stress) ? this.frequency + 200 : this.frequency;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, this.audioCtx.currentTime + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.02);

    osc.connect(envelope);
    envelope.connect(this.audioCtx.destination);

    osc.start(this.audioCtx.currentTime);
    osc.stop(this.audioCtx.currentTime + 0.03);
  }
}


