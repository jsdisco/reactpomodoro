import React, {useState, useEffect} from 'react';
import imgPlay from '../img/ui-play.svg';
import imgPause from '../img/ui-pause.svg';
import imgReset from '../img/ui-rotation.svg';

function Pomodoro(){

    const [breakLen, setBreakLen] = useState(5);
    const [sessLen, setSessLen] = useState(25);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(sessLen*60);
    const [currPhase, setCurrPhase] = useState('Session');

    function updateIsTimerRunning(e){
        if (e.target.closest('.btn').id === 'start_stop'){
            setIsTimerRunning(prev => !prev)
        } else if (e.target.closest('.btn').id === 'reset'){
            setIsTimerRunning(false)
        }
    }


    function updateLen(e){
        const [label, step] = e.target.id.split('-');
        if (label === 'break'){
            setBreakLen(prev => {
                if (step==='decrement'){
                    return prev > 1 ? prev-1 : prev;
                } else if (step==='increment'){
                    return prev < 59 ? prev+1 : prev;
                }
            })
        } else if (label === 'session'){
            setSessLen(prev => {
                if (step==='decrement'){
                    return prev > 1 ? prev-1 : prev;
                } else if (step==='increment'){
                    return prev < 59 ? prev+1 : prev;
                }
            })
        }
    }



    useEffect(() => {
        if (timeLeft < 0){
            setCurrPhase(prev => prev === 'Session' ? 'Break' : 'Session');
            setTimeLeft(() => currPhase === 'Session' ? breakLen*60 : sessLen*60);
        }
    }, [timeLeft, currPhase, breakLen, sessLen])

    useEffect(()=>{
        if (isTimerRunning && timeLeft >= 0){
            setTimeout(()=>{
                setTimeLeft(prev => prev-1)
            },1000);
        };
    }, [timeLeft, isTimerRunning])

    function formatTime(t){
        let minutes = Math.floor(t/60).toString();
        let seconds = (t%60).toString();
        if (seconds.length === 1){
            seconds = `0${seconds}`;
        }
        if (minutes.length === 1){
            minutes = `0${minutes}`;
        }
        return `${minutes}:${seconds}`
    }

    const timeLeftFormatted = formatTime(timeLeft);
    return (
        <div id="pomodoro">
            <div id="controls-length">
                <div className="controls-length">
                    <p id="break-label">Break length</p>
                    <div>
                        <div id="break-decrement" className="arrow btn" onClick={updateLen}>&#8681;</div>
                        <div><span id="break-length">{breakLen}</span></div>
                        <div id="break-increment" className="arrow btn" onClick={updateLen}>&#8679;</div>
                    </div>
                </div>
                <div className="controls-length">
                    <p id="session-label">Session length</p>
                    <div>
                        <div id="session-decrement" className="arrow btn" onClick={updateLen}>&#8681;</div>
                        <div><span id="session-length">{sessLen}</span></div>
                        <div id="session-increment" className="arrow btn" onClick={updateLen}>&#8679;</div>
                    </div>
                </div>
            </div>
            <div id="timer">
                <div id="timer-label">{currPhase}</div>
                <div id="time-left">{timeLeftFormatted}</div>
            </div>
            <div id="controls-start">
                <div id="start_stop" className="btn" onClick={updateIsTimerRunning}>
                    <img src={imgPlay} alt="playpause" />
                    <img src={imgPause} alt="playpause" />
                </div>
                <div id="reset" className="btn" onClick={updateIsTimerRunning}>
                    <img src={imgReset} alt="reset" />
                </div>
            </div>
        </div>
    )
}

export default Pomodoro;
