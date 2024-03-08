let startTime;
let running = false;
let paused = false;
let interval;
let lapCount = 1;

function startStop() {
  if (running) {
    clearInterval(interval);
    document.getElementById("startStop").textContent = "Resume";
    document.getElementById("pause").style.display = "none";
  } else {
    if (paused) {
      startTime = Date.now() - (lapCount - 1) * 1000;
    } else {
      startTime = Date.now() - lapCount * 1000;
    }
    interval = setInterval(updateDisplay, 10);
    document.getElementById("startStop").textContent = "Stop";
    document.getElementById("pause").style.display = "inline-block";
  }
  running = !running;
  paused = false;
}

function pause() {
  clearInterval(interval);
  document.getElementById("startStop").textContent = "Resume";
  document.getElementById("pause").style.display = "none";
  running = false;
  paused = true;
}

function reset() {
  clearInterval(interval);
  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("startStop").textContent = "Start";
  document.getElementById("pause").style.display = "none";
  document.getElementById("lapTimes").innerHTML = "";
  running = false;
  paused = false;
  lapCount = 1;
}

function lap() {
  if (!running) return;
  const lapTime = document.getElementById("display").textContent;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
  document.getElementById("lapTimes").appendChild(lapItem);
  lapCount++;
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  document.getElementById("display").textContent = 
    `${pad2(minutes)}:${pad2(seconds)}:${pad2(milliseconds)}`;
}

function pad2(number) {
  return (number < 10 ? '0' : '') + number;
}
