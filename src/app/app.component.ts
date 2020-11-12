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
  colorIntensity = null;


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
  ngOnInit() {
    this.changeColorIntensity();
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
      this.changeColorIntensity();

    }
  }

  decreaseNumber() {
    if (this.bpm > this.limitMin) {
      this.bpm--;
      this.changeColorIntensity();

    }
  }

  clearBpm() {
    clearInterval(this.tempo);
  }
  arrayConversion(n: number): any[] {
    return Array(n);
  }

  changeColorIntensity() {
    if (this.bpm <= 40) {
      this.colorIntensity = '#8801FE'
    } else if (this.bpm <= 100) {
      this.colorIntensity = '#011AFE'
    } else if (this.bpm <= 150) {
      this.colorIntensity = '#08C33A'
    } else if (this.bpm <= 200) {
      this.colorIntensity = '#FECD09'
    } else if (this.bpm <= 250) {
      this.colorIntensity = '#FE8C09'
    } else {
      this.colorIntensity = '#FE0909'
    }
  }

}


