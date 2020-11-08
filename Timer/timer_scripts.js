var timerInterval;
var affTimerInterval;
var negTimerInterval;
var minutes = 0;
var seconds = 0;
var lastMinutes = 0;
var lastSeconds = 0;
var affPrepMinutes = 0;
var affPrepSeconds = 0;
var negPrepMinutes = 0;
var negPrepSeconds = 0;
var currentRound = 0;
var prepTime = 5;
var affPrepTimeLeft = prepTime * 60;
var negPrepTimeLeft = prepTime * 60;
var isMuted = false;

var roundNames = ["1st Affirmative Constructive","Cross Examination","1st Negative Constructive","Cross Examination","2nd Affirmative Constructive","Cross Examination","2nd Negative Constructive", "Cross Examination", "1st Negative Rebuttal", "1st Affirmative Rebuttal", "2nd Negative Rebuttal", "2nd Affirmative Rebuttal"];

var roundTimes = [8, 3, 8, 3, 8, 3, 8, 3, 5, 5, 5, 5];

function start(){
        var startTime = Date.now();
        timerInterval = setInterval(function(){updateClock(startTime)}, 100);
        document.getElementById("startButton").setAttribute("onClick", "javascript: stop()");
        document.getElementById("startTitle").innerHTML = " Pause";
        document.getElementById("startIcon").setAttribute("class", "fas fa-pause");
}

function stop(){
    lastSeconds = seconds;
    lastMinutes = minutes;
    clearInterval(timerInterval);
    document.getElementById("startButton").setAttribute("onClick", "javascript: start()");
    document.getElementById("startTitle").innerHTML = " Start";
    document.getElementById("startIcon").setAttribute("class", "fas fa-play");
}

function nextRound(){
    if(currentRound < 11){
        currentRound++;
    }
    document.getElementById("roundName").innerHTML = roundNames[currentRound];
}

function lastRound(){
    if(currentRound > 0){
        currentRound--;
    }
    document.getElementById("roundName").innerHTML = roundNames[currentRound];
}

function reset() {
    lastMinutes = 0;
    lastSeconds = 0;
    document.getElementById("clock").innerHTML = `0:00`;
    clearInterval(timerInterval);
    document.getElementById("startButton").setAttribute("onClick", "javascript: start()");
    document.getElementById("startTitle").innerHTML = " Start";
    document.getElementById("startIcon").setAttribute("class", "fas fa-play");
    $('#overtimeWrapper').collapse('hide');
}

function updateClock(startTime){
    var change = Date.now() - startTime;
    var secondsDiff = Math.floor(change / 1000);
    seconds = ((lastSeconds + secondsDiff) % 60);
    minutes = lastMinutes + (Math.floor((secondsDiff + lastSeconds)/ 60));
    var secondsString = "";
    if (seconds < 10){
        secondsString = "0"+seconds;
    }
    else{
        secondsString = seconds;
    }
    document.getElementById("clock").innerHTML = `${minutes}:${secondsString}`;
    if (minutes == roundTimes[currentRound] && seconds == 0) {
        $('#overtimeWrapper').collapse('show');
        playDing();
    }
}

function updateAffPrepClock(startTime) {
    var endTime = startTime + (affPrepTimeLeft*1000)
    var change = endTime - Date.now();
    var secondsDiff = Math.floor(change / 1000);
    affPrepSeconds = secondsDiff % 60;
    affPrepMinutes = Math.floor((secondsDiff) / 60);
    var secondsString = "";
    if (affPrepSeconds < 10) {
        secondsString = "0" + affPrepSeconds;
    }
    else {
        secondsString = affPrepSeconds;
    }
    document.getElementById("affClock").innerHTML = `${affPrepMinutes}:${secondsString}`;
    if (affPrepMinutes == 0 && affPrepSeconds == 0) {
        playAlarm();
        affPrepReset();
        document.getElementById("affClock").style.color = "#dc3545";
        document.getElementById("affClock").innerHTML = '0:00';

    }
}

function updateNegPrepClock(startTime) {
    var endTime = startTime + (negPrepTimeLeft*1000)
    var change = endTime - Date.now();
    var secondsDiff = Math.floor(change / 1000);
    negPrepSeconds = secondsDiff % 60;
    negPrepMinutes = Math.floor((secondsDiff) / 60);
    var secondsString = "";
    if (negPrepSeconds < 10) {
        secondsString = "0" + negPrepSeconds;
    }
    else {
        secondsString = negPrepSeconds;
    }
    document.getElementById("negClock").innerHTML = `${negPrepMinutes}:${secondsString}`;
    if (negPrepMinutes == 0 && negPrepSeconds == 0) {
        playAlarm();
        negPrepReset();
        document.getElementById("negClock").style.color = "#dc3545";
        document.getElementById("negClock").innerHTML = '0:00';
    }
}

function affPrepStart() {
    var startTime = Date.now();
    affTimerInterval = setInterval(function () { updateAffPrepClock(startTime) }, 100);
    document.getElementById("affPrepStartButton").setAttribute("onClick", "javascript: affPrepStop()");
    document.getElementById("affPrepStartIcon").setAttribute("class", "fas fa-pause");
}

function affPrepStop() {
    affPrepTimeLeft = affPrepMinutes*60 + affPrepSeconds
    clearInterval(affTimerInterval);
    document.getElementById("affPrepStartButton").setAttribute("onClick", "javascript: affPrepStart()");
    document.getElementById("affPrepStartIcon").setAttribute("class", "fas fa-play");
}

function affPrepReset() {
    affPrepTimeLeft = prepTime * 60;
    document.getElementById("affClock").innerHTML = `${prepTime}:00`;
    clearInterval(affTimerInterval);
    document.getElementById("affPrepStartButton").setAttribute("onClick", "javascript: affPrepStart()");
    document.getElementById("affPrepStartIcon").setAttribute("class", "fas fa-play");
    document.getElementById("negClock").style.color = "black";
}

function negPrepStart() {
    var startTime = Date.now();
    negTimerInterval = setInterval(function () { updateNegPrepClock(startTime) }, 100);
    document.getElementById("negPrepStartButton").setAttribute("onClick", "javascript: negPrepStop()");
    document.getElementById("negPrepStartIcon").setAttribute("class", "fas fa-pause");
}

function negPrepStop() {
    negPrepTimeLeft = negPrepMinutes*60 + negPrepSeconds
    clearInterval(negTimerInterval);
    document.getElementById("negPrepStartButton").setAttribute("onClick", "javascript: negPrepStart()");
    document.getElementById("negPrepStartIcon").setAttribute("class", "fas fa-play");
}

function negPrepReset() {
    negPrepTimeLeft = prepTime * 60;
    document.getElementById("negClock").innerHTML = `${prepTime}:00`;
    clearInterval(negTimerInterval);
    document.getElementById("negPrepStartButton").setAttribute("onClick", "javascript: negPrepStart()");
    document.getElementById("negPrepStartIcon").setAttribute("class", "fas fa-play");
    document.getElementById("negClock").style.color = "black";
}

function playDing() {
    if(!isMuted){
        document.getElementById("ding").play();
    }
}

function playAlarm() {
    if(!isMuted){
        document.getElementById("alarm").play();
    }
}

function mute(){
    document.getElementById("volumeIcon").setAttribute("class", "fas fa-volume-off");
    document.getElementById("volumeButton").setAttribute("onClick", "javascript: unmute()");
    isMuted = true;
}

function unmute(){
    document.getElementById("volumeIcon").setAttribute("class", "fas fa-volume-up");
    document.getElementById("volumeButton").setAttribute("onClick", "javascript: mute()");
    isMuted = false;
}
