const time = document.querySelector('.stopwatch')
const mainButton = document.querySelector('#main-button')
const restartButton = document.querySelector('#restart-button')
const clearButton = document.querySelector('#clear-button')
const stopwatch = { elapsedTime: 0 }
const titulo = document.querySelector('title')


mainButton.addEventListener('click', () => {
  if (mainButton.innerHTML === 'Start') {
    startStopwatch();
    mainButton.innerHTML = 'Stop'
  } else {
    stopwatch.elapsedTime += Date.now() - stopwatch.startTime
    clearInterval(stopwatch.intervalId)
    mainButton.innerHTML = 'Start'
  }
})

clearButton.addEventListener('click', () => {
  stopwatch.elapsedTime = 0
  stopwatch.startTime = Date.now()
  displayTime(0, 0, 0, 0)
})

restartButton.addEventListener('click', () => {
  clearInterval(stopwatch.intervalId)
  
  if (mainButton.innerHTML === 'Start') {
    mainButton.innerHTML = 'Stop'
  }
  
  stopwatch.elapsedTime = 0
  displayTime(0, 0, 0, 0)
  startStopwatch();
})


function startStopwatch() {
  //reset start time
  stopwatch.startTime = Date.now();
  //run `setInterval()` and save id
  stopwatch.intervalId = setInterval(() => {
    //calculate elapsed time
    const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime
    //calculate different time measurements based on elapsed time
    //const milliseconds = parseInt((elapsedTime%1000)/10)
    const seconds = parseInt((elapsedTime/1000)%60)
    const minutes = parseInt((elapsedTime/(1000*60))%60)
    const hour = parseInt((elapsedTime/(1000*60*60))%24);
    //display time
    //displayTime(hour, minutes, seconds, milliseconds)
	displayTime(hour, minutes, seconds, 0)
  }, 100);
}

function displayTime(hour, minutes, seconds, milliseconds) {
  //const leadZeroTime = [hour, minutes, seconds, milliseconds].map(time => time < 10 ? `0${time}` : time)
  const leadZeroTime = [hour, minutes, seconds].map(time => time < 10 ? `0${time}` : time)
  time.innerHTML = leadZeroTime.join(':')
  titulo.textContent = leadZeroTime.join(':')
}