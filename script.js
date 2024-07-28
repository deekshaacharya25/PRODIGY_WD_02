// Get elements from the DOM
const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapsList = document.getElementById('laps-list');

// Initialize variables
let timerInterval;
let elapsedTime = 0;
let isRunning = false;

// Function to format time
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to update the time display
function updateTimeDisplay() {
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start button event listener
startButton.addEventListener('click', () => {
    if (!isRunning) {
        startButton.textContent = 'Resume';
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
        isRunning = true;
        timerInterval = setInterval(() => {
            elapsedTime += 100;
            updateTimeDisplay();
        }, 100);
    }
});

// Pause button event listener
pauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
});

// Reset button event listener
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    startButton.textContent = 'Start';
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapsList.innerHTML = '';
    updateTimeDisplay();
});

// Lap button event listener
lapButton.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.childElementCount + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
});

// Initialize time display
updateTimeDisplay();
