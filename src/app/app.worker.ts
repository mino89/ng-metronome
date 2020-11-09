/// <reference lib="webworker" />
let timer;
let counter = 0;

function calculate_bpm(val) {
  return 60000 / val;
}

addEventListener('message', ({ data }) => {
  const response = data;
  if (data.command === 'start') {
    clearInterval(timer);
    timer = setInterval(() => {
      counter++;
      data.count = counter;
      postMessage(response);
    }, calculate_bpm(data.bpm));
  } else {
    counter = 0;
    clearInterval(timer);
  }


});
