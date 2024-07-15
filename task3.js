let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startTime = null;
    difference = null;
    display.innerHTML = '00:00:00.00';
    lapTimes.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapCounter++;
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapTimes.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.innerHTML = timeToString(updatedTime);
}

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}
