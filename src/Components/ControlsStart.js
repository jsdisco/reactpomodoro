import React from 'react';
import imgPlay from '../img/ui-play.svg';
import imgPause from '../img/ui-pause.svg';
import imgReset from '../img/ui-rotation.svg';

function ControlsStart({ updateIsTimerRunning }){
    return(
        <div id="controls-start">
            <div id="start_stop" className="btn" onClick={updateIsTimerRunning}>
                <img src={imgPlay} alt="playpause" />
                <img src={imgPause} alt="playpause" />
            </div>
            <div id="reset" className="btn" onClick={updateIsTimerRunning}>
                <img src={imgReset} alt="reset" />
            </div>
        </div>
    )
}

export default ControlsStart;
