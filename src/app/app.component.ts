import { Component, OnInit } from '@angular/core';
import { count } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-mertronome';
  timer = null;
  audio = new Audio('../assets/metro_mine/MetroBar1.wav');
  audioStress = new Audio('../assets/metro_mine/MetroBeat1.wav');
  stress = false;
  bpm = 60;
  beats = 1;
  switchClass = false;
  ngOnInit() {

  }

  start(bpm, beats) {
    this.stop();
    this.timer = this.metronome_engine(bpm, beats);
  }

  stop() {
    return clearInterval(this.timer);
  }

  metronome_engine(bpm, beats) {
    let counter = 0;
    return setInterval(() => {
      if (counter == beats) {
        counter = 1;
      } else {
        counter++;
      }
      this.beat_maker(counter);
      this.switchClass = !this.switchClass;
    }, this.calculate_bpm(bpm));
  }

  beat_maker(counter) {
    if (this.stress) {
      if (counter <= 1) {
        console.log('primo');
        this.audioStress.play()
      } else {
        this.audio.play()
        console.log('bit');
      }
    } else {
      this.audio.play()
      console.log('bit');
    }
  }

  calculate_bpm(val) {
    return 60000 / val;
  }

}
