let startBtn = document.getElementById('startbtn');
let startscreen = document.getElementById('startscreen');
let selectionContainer = document.getElementById('sltncontainer');
let selectionImg = document.getElementById('sltnimg');
let obituary = document.getElementById("obituary")
let obitimg = document.getElementById("obitimg");
let vid = document.getElementById("frontclip");
let timer = document.getElementById("timer");



//audio
let crashaudio = new Audio('audio/Crash.m4a');
let selectionaudio = new Audio('audio/PersonSelection.m4a');
let suspenseaudio = new Audio('audio/suspense.wav');
let countdown = new Audio('audio/Countdown.mp3');


let selectionShots = ["./img/one.png", "./img/two.png", "./img/three.png", "./img/four.png"];
let obitImgs = ["./img/obit1.png", "./img/obit2.png", "./img/obit3.png", "./img/obit4.png"];
let currentShot;

currentShot = Math.floor(Math.random() * 4);
selectionImg.src = selectionShots[currentShot];

startBtn.addEventListener("click", start)
vid.addEventListener('ended', selection,false);
document.getElementById('leftbtn').addEventListener("click", () => {select("left")});
document.getElementById('rightbtn').addEventListener("click", () => {select("right")});
document.getElementById('okbtn').addEventListener("click", endGame);


function start() {
    selectionaudio.loop = false;
    selectionaudio.play();
    vid.style.display = "block";
    startscreen.style.display = "none";
    vid.play();
}

function selection() {
    countdown.loop = false;
    countdown.play();
    vid.style.display = "none";
    selectionContainer.style.display ="block";
    startTimer(30, timer);
}

function select(dir) {
    selectionaudio.loop = false;
    selectionaudio.play();
    if (dir == "left") {
        currentShot =  currentShot == 0 ? 3 : currentShot -=1;
        console.log('math is', currentShot);
    } else if (dir == "right") {
        currentShot = currentShot == 3 ? 0 : currentShot+=1;
    }
    selectionImg.src = selectionShots[currentShot];
    console.log("currentshot", currentShot);
}



document.onkeydown = (e) => {
    console.log(e.key);
    if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    
if(e.key == "q") {
        vid.pause(); 
        selection();
    }

    if (e.key == "ArrowLeft") {
        select("left");
    }
    else if (e.key == "ArrowRight") {
        select("right");
    }
}

let timerinterval;
let endgametriggered = false;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerinterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerinterval)
            endGame()
        }
    }, 1000);
}

function endGame() {
    if (!endgametriggered) {
        endgametriggered = true;
        countdown.pause();
        countdown.currentTime = 0;
        console.log('triggerd');
        crashaudio.loop = false;
        crashaudio.play();
        suspenseaudio.loop = true;
        suspenseaudio.play();
        selectionContainer.style.display = "none";
        obitimg.src = obitImgs[currentShot];
        obituary.style.display = "block";
        obitimg.style.opacity= 1;
    }
}

