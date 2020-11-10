import { SoundService } from './sound.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-mertronome';
  tempo = null;
  stress = false;
  bpm = 60;
  beats = 2;
  limitMax = 300;
  limitMin = 40;
  frequency = 800;
  switchClass = false;
  worker: Worker;
  running: boolean = false;
  constructor(
    public soundService: SoundService
  ) {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker('./app.worker', { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        this.soundService.sound(data.count, data.beats, this.stress, this.frequency)
        this.switchClass = !this.switchClass;
      };
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  start(bpm, beats) {
    this.running = true;
    this.worker.postMessage({
      command: 'start',
      bpm,
      beats,
    });
  }

  stop() {
    this.running = false;
    this.worker.postMessage({
      command: 'stop'
    });
  }

  increaseBpm() {

    return this.tempo = setInterval(() => {
      this.increaseNumber();
    }, 100);

  }


  decreaseBpm() {
    return this.tempo = setInterval(() => {
      this.decreaseNumber();
    }, 100);
  }

  increaseNumber() {
    if (this.bpm <= this.limitMax) {
      this.bpm++;
    }
  }

  decreaseNumber() {
    if (this.bpm > this.limitMin) {
      this.bpm--;
    }
  }
  clearBpm() {
    clearInterval(this.tempo);
  }

}


