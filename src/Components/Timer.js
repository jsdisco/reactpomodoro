import React from 'react';

function Timer({ timeLeft, breakLen, sessLen, currPhase }){

    function formatTime(t){
        let minutes = Math.floor(t/60).toString();
        let seconds = (t%60).toString();
        seconds = seconds.length === 1 ? `0${seconds}` : seconds;
        minutes = minutes.length === 1 ? `0${minutes}` : minutes;
        return `${minutes}:${seconds}`
    }

    const timeLeftFormatted = formatTime(timeLeft);


    return (
        <div id="timer">
            <div id="timer-label">{currPhase}</div>
            <div id="time-left">{timeLeftFormatted}</div>
        </div>
    )
}

export default Timer;
