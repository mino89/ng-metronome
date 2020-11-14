import { SoundService } from './sound.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pretitle = 'Easy';
  title = 'Metronome';
  tempo = null;
  tempoName = null;
  stress = false;
  bpm = 60;
  beats = 2;
  count = null;
  limitMax = 300;
  limitMin = 40;
  frequency = 800;
  switchClass = false;
  worker: Worker;
  running = false;
  colorIntensity = null;


  constructor(
    public soundService: SoundService
  ) {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker('./app.worker', { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        this.soundService.sound(data.count, data.beats, this.stress, this.frequency);
        this.count = data.count % data.beats;
        console.log(data.count);
        this.switchClass = !this.switchClass;
      };
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
  ngOnInit() {
    this.changeTempo();
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
    this.count = null;
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
      this.changeTempo();

    }
  }

  decreaseNumber() {
    if (this.bpm > this.limitMin) {
      this.bpm--;
      this.changeTempo();

    }
  }

  clearBpm() {
    clearInterval(this.tempo);
  }
  arrayConversion(n: number): any[] {
    return Array(n);
  }

  changeTempo() {
    if (this.bpm <= 40) {
      this.tempoName = 'grave';
    } else if (this.bpm <= 50) {
      this.tempoName = 'largo';
    } else if (this.bpm <= 60) {
      this.tempoName = 'larghetto';
    } else if (this.bpm <= 70) {
      this.tempoName = 'adagio';
    } else if (this.bpm <= 90) {
      this.tempoName = 'andante';
    } else if (this.bpm <= 100) {
      this.tempoName = 'moderato';
    } else if (this.bpm <= 120) {
      this.tempoName = 'allegretto';
    } else if (this.bpm <= 160) {
      this.tempoName = 'vivace';
    } else if (this.bpm <= 190) {
      this.tempoName = 'presto';
    } else {
      this.tempoName = 'prestissimo';
    }
    this.stop();
  }

}


