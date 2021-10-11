import './App.css';
import React, { useState, useEffect } from 'react';
import Flows from './Flows';

function App() {
  const [timerHours, changeTimerHours] = useState(0);
  const [timerMinutes, changeTimerMinutes] = useState(0);
  const [flowCount, changeFlowCount] = useState(1);
  const [flowDuration, changeFlowDuration] = useState(0);
  const [window, changeWindow] = useState(0);
  
  /* 
    0 - Configuration Window
    1 - Running Window
  */
  
  const [[cdM, cdS], changeCDTime] = useState([0,0]);
  const [cdFlowCount, changeCDFlowCount] = useState(0);
  /* 
    0 - Pause
    1 - Play
  */
  const [cdStatus, changeCDStatus] = useState(0); 

  
  useEffect(() => {
    if(window === 1 && cdStatus === 1){
      const timer = setInterval(() => changeTime(), 1000);
      // console.log("Played");
      return () => clearInterval(timer);
    }
  }, [cdStatus,cdM,cdS]);

  useEffect( () => {
    if(window === 0) getFlowTimePeriod();
  })

  const play = () => {
    document.getElementById('xyz').play();
  }
  const changeTime = () => {
    if(cdM === 0 && cdS === 0){
      changeCDFlowCount((cdFlowCount) => cdFlowCount - 1);
      if(cdFlowCount === 1){
        play();
        alert("All Flows Finished.");
        changeCDStatus(0);
      } else {
        play();
        alert("Flow Finished");
        changeCDTime(([cdM,cdS]) => [flowDuration, 0]);
        changeCDStatus(0);
      }
    }
    else if (cdS === 0){
      changeCDTime([cdM-1,parseInt(59)]);
      console.log(cdS);
      console.log("Minute Change");
    } else {
      changeCDTime(([cdM,cdS]) => [cdM,cdS - 1]);
      console.log(cdS);
      console.log("Second Change");
    }
    console.log("Entered Change Time");
  }

  const showInputTimer = () => {
    return (
      <div className="timer-container">
        <div className="timer-val">
          <label className="labels">
            HOURS
          </label>
          <br/>
          <input 
            className = "input-timer"
            name = "hours"
            type = "number"
            min="0" 
            max="24"
            placeholder="HH"
            value = {timerHours <= 12 ? timerHours : changeTimerHours(12)}
            onChange = {(event) => {changeTimerHours(event.target.value)}}
          />
          
        </div>
        <div className= "vertical"></div>
        <div className="timer-val">
          <label className="labels">
            MINUTES
          </label>
          <br/>
          <input 
            className = "input-timer"
            name = "minutes"
            type = "number"
            min="0" 
            max="60"
            placeholder="MM"
            value = {timerMinutes <= 59 ? timerMinutes : changeTimerMinutes(59)}
            onChange = {(event) => {changeTimerMinutes(event.target.value)}}
          />
          
        </div>
      </div>
    )
  }

  const getFlowTimePeriod = () => {
    let val = parseInt(timerHours)*60 + parseInt(timerMinutes);
    if(val === 0){
      changeFlowDuration("00");
    }
    else {
      val = (val/flowCount).toFixed();
      changeFlowDuration(parseInt(val));
    }
  }

  const showSlider = () => {
    return (
      <div className="flow-utils">
        <div className="flow-count"> 
          <label className="slider-label"> FLOW COUNT </label>
          <br/>
          <div className="flow-slider">
            <input 
              className="slider"
              type="range" 
              name="count"
              min="1" 
              max="20" 
              value = {flowCount}
              onChange = {(event) => {
                changeFlowCount(event.target.valueAsNumber);
              }}  
            />
            <p className="flow-count-val">{flowCount}</p>
          </div>
        </div>
        <div className="flow-time-period">
          FLOW DURATION : {flowDuration} MINUTES
        </div>
      </div>
    )
  }

  const showCurrentTimer = () => {
    return (
      <div className="countdown">
      <div className="countdown-text">
        {parseInt(cdM) <= 9 ? "0" + cdM.toString() : cdM } : {cdS <= 9 ? "0" + cdS.toString() : cdS }
      </div>
      </div>
    )
  }

  const showPlayPause = () => {
    return(
      <>
      <div className = "play-pause">
      <button 
        className="start-button"
        onClick= {() => (changeCDStatus(1))}
      > PLAY </button>
      <button 
        className="start-button"
        onClick={() => {changeCDStatus(0)}}
      > PAUSE </button>
      </div>
      </>
    )
  }

  const showStartButton = () => {
    return (
      <button 
      className="start-button"
      onClick = {() => {
        if(parseInt(flowDuration) === 0 || isNaN(flowDuration)){
          alert("Please choose valid hours and minutes");
        }
        else{
          changeWindow(1);
        changeCDFlowCount(flowCount);
        changeCDTime([parseInt(flowDuration),0]); 
      
        }
      }}
      >START</button>
    )
  }

  const showFlows = () => {
    return(
      <Flows
        flowCount = {flowCount}
        flowDuration = {flowDuration}
        cdFlowCount = {cdFlowCount}
        cdStatus = {cdStatus}
      ></Flows>
    )
  }
  const showReset = () => {
    const handleOnClick = () => {
      changeWindow(0);
    }
    return(
      <button className="start-button" onClick = {() => {handleOnClick()}}>
        RESET
      </button>
    )
  }
  const showWindow = () => {
    if(window === 0){
      return(
        <>
        {showInputTimer()}
        {showSlider()}
        {showStartButton()}
        </>
      );
    } else {
      return(
        <>
        {showCurrentTimer()}
        {showPlayPause()}
        {showFlows()}
        {showReset()}
        </>
      )
    }
  }
  const description = () => {
    if(window === 0){
      return(
        <>
        <p> Choose the total focus time. </p>
        <p> Select the number of flows you want to divide it into. </p>
        <p> Press START. </p>
        </>
      )
    }
    else {
      return(
      <>
      <p> Press PAUSE to pause the flow. </p>
      <p> Press PLAY to start the flow. </p>
      <p> Press RESET to go back to the setup screen.</p>
      <p> Your flows will change colours as you finish them.</p>
      </>
      )
    }
  }
  return (
    <div className="app">
      <audio id="xyz" src='https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3' preload="auto"></audio>
      <div className="card">
      <header className="app-header">
        FLOW TIMER
      </header>
      <hr className="divider"/>
      {description()}
      <div>
      {showWindow()}
      </div>
      </div>
    </div>
  );
}

export default App;
