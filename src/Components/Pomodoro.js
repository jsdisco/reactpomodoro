import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import ControlsLength from './ControlsLength.js';
import ControlsStart from './ControlsStart.js';
import Timer from './Timer.js';
import audio from '../audio/alarm.wav';

function Pomodoro() {

    const [sessLen, setSessLen] = useState(1);
    const [breakLen, setBreakLen] = useState(1);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [currPhase, setCurrPhase] = useState('session');
    const [timeLeft, setTimeLeft] = useState(sessLen * 60);

    const timeoutID = useRef('');
    const beep = useRef(null);

    useEffect(() => {
        if (currPhase === 'session') {
            setTimeLeft(sessLen * 60)
        }
    }, [sessLen, currPhase])

    useEffect(() => {
        if (currPhase === 'break') {
            setTimeLeft(breakLen * 60)
        }
    }, [breakLen, currPhase])

    useEffect(() => {
        if (isTimerRunning && timeLeft > 0) {
            timeoutID.current = setTimeout(() => {
                setTimeLeft(prev => prev - 1)
            }, 100);
        } else if (isTimerRunning && timeLeft <= 0) {
            setCurrPhase(prev => prev === 'session' ? 'break' : 'session');
            playAudio(true);
        }
        if (!isTimerRunning) {
            clearTimeout(timeoutID.current)
        }
    }, [timeLeft, isTimerRunning])


    function updateIsTimerRunning(e) {
        if (e.target.closest('.btn').id === 'start_stop') {
            setIsTimerRunning(prev => !prev);
        } else if (e.target.closest('.btn').id === 'reset') {
            setIsTimerRunning(false);
            setTimeLeft(1500)
            setSessLen(25);
            setBreakLen(5);
            setCurrPhase('session');
            playAudio(false)
        }
    }

    function updateLen(e) {
        if (!isTimerRunning) {
            const [phase, action] = e.target.id.split('-');
            if (phase === 'session') {
                if (action === 'decrement') {
                    setSessLen(prev => prev > 1 ? prev - 1 : prev)
                } else if (action === 'increment') {
                    setSessLen(prev => prev < 60 ? prev + 1 : prev)
                };
            } else if (phase === 'break') {
                if (action === 'decrement') {
                    setBreakLen(prev => prev > 1 ? prev - 1 : prev)
                } else if (action === 'increment') {
                    setBreakLen(prev => prev < 60 ? prev + 1 : prev)
                };
            }
        }
    }

    function playAudio(bool){
        if (bool) {
            beep.current.play()
        } else {
            beep.current.currentTime=0;
            beep.current.pause()
        }
    }

    return ( < div id = "pomodoro" ><audio id="beep" src={audio} ref={beep}/>

        <
        ControlsLength breakLen = {
            breakLen
        }
        sessLen = {
            sessLen
        }
        updateLen = {
            updateLen
        }
        /> <
        Timer timeLeft = {
            timeLeft
        }
        breakLen = {
            breakLen
        }
        sessLen = {
            sessLen
        }
        currPhase = {
            currPhase
        }
        /> <
        ControlsStart updateIsTimerRunning = {
            updateIsTimerRunning
        }
        /> < /
        div >
    )
}

export default Pomodoro;
