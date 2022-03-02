import {React, useEffect, useState} from 'react'

export default function Timer (){

    const [isFinished, setIsFinished] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [timeSeconds, setTimeSeconds] = useState(0)
    const [timerLimit, setTimerLimit] = useState(25)

    const incrementTimer = () => {
       setTimeSeconds((timeSeconds) => timeSeconds + 1)
    }

    const renderTimer = () => {

        const totalRemainingTime = timerLimit * 60 - timeSeconds 
        let minutes = Math.floor(totalRemainingTime / 60)
        let seconds = Math.floor(totalRemainingTime % 60)
        const minutesToString = minutes > 9 ? minutes : `0${minutes}`
        const secondsToString = seconds > 9 ? seconds : `0${seconds}`

        return (
            <span>
                {minutesToString} : {secondsToString}
            </span>
            
        )
    }

    const resetTimer = () => {
        setTimerLimit(25)
        setTimeSeconds(0)
    }

    useEffect(() => {
       const timer = setInterval(() => {
            if(isRunning) {
                incrementTimer()
            }
        },1000)
        return () => clearInterval(timer)
    },[isRunning])

    const buttonPlay = () => {

        return (

            <button onClick={()=>setIsRunning(!isRunning)}>
               {isRunning ? 'Stop' : 'Start'}
            </button>
        )

    }

    const buttonReset = () => {
        return (
            <button disabled={isRunning ? true : false} onClick={()=>resetTimer()}>
                RESET
            </button>
        )
    }
 
    return (
        
        <div>
            <h1>Timer</h1>
            <div>
                {renderTimer()}
            </div>
            {buttonPlay()}
            {buttonReset()}
        </div>

    )
}