/// <reference lib="webworker" />
let timer;
let counter = -1;

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
    counter = -1;
    clearInterval(timer);
  }


});
