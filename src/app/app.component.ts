import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-mertronome';
  timer = null;
  audio = new Audio('../assets/metro_mine/MetroBar1.wav')
  bpm: number;

  ngOnInit() {

  }

  start(bpm) {
    this.stop();
    this.timer = this.metronome_engine(bpm)
  }

  stop() {
    return clearInterval(this.timer);
  }

  metronome_engine(bpm) {
    return setInterval(() => {
      this.audio.play()
    }, this.calculate_bpm(bpm))
  }

  calculate_bpm(val){
    return 60000 / val;
  }

}
