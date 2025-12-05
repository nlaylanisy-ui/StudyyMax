const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
const settimeBtn = document.getElementById("settime");
const alarmSound = document.getElementById("alarmSound"); 

let interval;
let timeLeft = 1500;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  timerEl.innerHTML = formattedTime;
}

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(interval);

      // 🔔 mainkan alarm
      alarmSound.currentTime = 0; // mulai dari awal
      alarmSound.play();

      alert("Time's up!");
      timeLeft = 1500;
      updateTimer();
    }
  }, 1000);
}
    
function stopTimer() {
  clearInterval(interval);
  alarmSound.pause(); // berhentiin alarm kalau ada
}

function resetTimer() {
  clearInterval(interval);
  timeLeft = 1500;
  updateTimer();
  alarmSound.pause(); // reset alarm
  alarmSound.currentTime = 0;

}

function setTimer() {
  let minutes = parseInt(prompt("Masukkan waktu (menit):", "25"));
  if (!isNaN(minutes) && minutes > 0) {
    timeLeft = minutes * 60;
    defaultTime = timeLeft; // update default
  } else {
    alert("Masukkan angka menit yang valid!");
  }
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
settimeBtn.addEventListener("click", setTimer);

updateTimer();
