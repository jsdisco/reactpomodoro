import React from 'react';

function ControlsLength({ breakLen, sessLen, updateLen }){
    return(
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
    )
}

export default ControlsLength;
