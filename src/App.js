import React, { useState, useRef } from 'react';


function App() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleStop = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  }

  const handleWait = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(true);
  }

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
    if (isActive && !isPaused)
    handleStart();
  }

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  return (
    <div className="App">
      <h3>Stopwatch</h3>
      <div className="stopwatch-card">
        <p>{formatTime()}</p>
        <div className="buttons">
          {
            !isActive && !isPaused ? 
            <button onClick={handleStart}>Start</button>
            : (
              isPaused && !isActive ? <button onClick={handleStart}>Start</button> :
              <button onClick={handleStop}>Stop</button>
            )
          }
          <button onDoubleClick={handleWait}>Wait</button>
          <button onClick={handleReset}>Reset</button> 
        </div>
      </div>
    </div>
  );
  
}

export default App;
