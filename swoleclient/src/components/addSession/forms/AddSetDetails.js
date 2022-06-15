import React, { useEffect, useState } from "react"
import { createExerciseInSession, getExercisesInSession } from "../AddSessionManager"


export const AddSetDetails = ({sessionRefresh, setSessionRefresh,currentSession}) => {
    const [exercisesInSession, setExercisesInSession] = useState([])

    const [ newExerciseInSession, setExInSession ] = useState({
        exercise: 0,
        session: currentSession.id,
        set_number: 0,
        load: 0,
        reps: 0
    })

    useEffect(()=>{
        getExercisesInSession(currentSession.id)
        .then(data => setExercisesInSession(data))
    },[sessionRefresh])

    const changeExInSessState = (evt) => {
        const newEx = Object.assign({}, newExerciseInSession)
        newEx[evt.target.name] = evt.target.value
        setExInSession(newEx)
    }

    const submitExerciseInSession = (evt) => {
        evt.preventDefault()

        const newExerciseInSessionObj = {
            exercise: parseInt(evt.target.id),
            session: parseInt(currentSession.id),
            set_number: parseInt(newExerciseInSession.set_number),
            load: parseInt(newExerciseInSession.load),
            reps: parseInt(newExerciseInSession.reps)
        }

        createExerciseInSession(newExerciseInSessionObj)
        .then(() => (setSessionRefresh(!sessionRefresh))) 

    }
    return(
        <form className="addExercisesAndDetails">
            {
                exercisesInSession.map(exerciseInSession => {
                    if(exerciseInSession.set_number === 0 && exerciseInSession.session.id === currentSession.id){
                        return<div className ="exerciseInSessionList">
                                    <p>{exerciseInSession.exercise.name}</p>
                                    <div className="setDetails-form">

                                        <div className="detailsInput">
                                            <label className="setNumber">Set Number:  </label>
                                            <input 
                                                onChange={changeExInSessState} 
                                                name="set_number" 
                                                type= "number" 
                                                min="1" 
                                                className="setNumberInput" 
                                                placeholder=""
                                                required>
                                            </input>
                                        </div>

                                        <div className="detailsInput">
                                            <label className="load">Load:  </label>
                                            <input 
                                                onChange={changeExInSessState} 
                                                name="load" 
                                                type= "number" 
                                                min="0"
                                                className="loadInput" 
                                                placeholder="0"
                                                required>
                                            </input>
                                        </div>

                                        <div className="detailsInput">
                                            <label className="reps">Reps:  </label>
                                            <input 
                                                onChange={changeExInSessState} 
                                                name="reps"
                                                type= "number" 
                                                min="1" 
                                                className="RepsInput" 
                                                placeholder=""
                                                required>
                                            </input>
                                        </div>

                                        <button 
                                            onClick={(evt)=>{submitExerciseInSession(evt)}}
                                            className="my-Button"
                                            id={exerciseInSession.exercise.id}>
                                                Add Set
                                        </button>
                                    </div>
                        </div>
                    }
                    else if (exerciseInSession.session.id === currentSession.id && exerciseInSession.set_number != 0){
                        return  <>
                        <p>Set: {exerciseInSession.set_number} Load: {exerciseInSession.load} Reps: {exerciseInSession.reps} <button className="my-Button">Edit Details</button></p>
                        </>
                            }
                        } )
                        }
        </form>
    )
}