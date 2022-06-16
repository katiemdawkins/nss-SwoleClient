import React, { useEffect, useState } from "react"
import { createExerciseInSession, getExerciseInSessionById, getExercisesInSession, updateExerciseInSession } from "../AddSessionManager"
import { EditSetDetails } from "./EditSetDetails"


export const AddSetDetails = ({sessionRefresh, setSessionRefresh, currentSession}) => {
    const [exercisesInSession, setExercisesInSession] = useState([])
    const [ showSetForm, setShowSetForm ] = useState(false)
    const [ showEditForm, setShowEditForm ] = useState(false)

    const [ newExerciseInSession, setExInSession ] = useState({
        exercise: 0,
        session: currentSession.id,
        set_number: 0,
        load: 0,
        reps: 0
    })
    
    //get exercises in session from current session id 
    useEffect(()=>{
        getExercisesInSession(currentSession.id)
        .then(data => setExercisesInSession(data))
    },[sessionRefresh]
    )


    //for new exercise in session object
    const changeExInSessState = (evt) => {
        const newEx = Object.assign({}, newExerciseInSession)
        newEx[evt.target.name] = evt.target.value
        setExInSession(newEx)
    }

    //submit new exercise in session set,load,rep details
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
        .then(() => setSessionRefresh(!sessionRefresh)) 

    }

    return(
        <form className="addExercisesAndDetails">
            {
                exercisesInSession.map(exerciseInSession => {
                    if(exerciseInSession.set_number === 0 && exerciseInSession.session.id === currentSession.id){
                        return<div className ="exerciseInSessionList">
                                    <p>{exerciseInSession.exercise.name} 
                                        <button 
                                            className="my-Button"
                                            onClick={()=>{setShowSetForm(!showSetForm)}}
                                        >+</button>
                                    </p>
                                    {
                                        showSetForm
                                            ? <div className="setDetails-form">

                                                <div className="detailsInput">
                                                    <label className="setNumber">Set Number: </label>
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
                                                    onClick={(evt)=>{
                                                        submitExerciseInSession(evt)
                                                        setShowSetForm(!showSetForm)
                                                    }}
                                                            className="my-Button"
                                                            id={exerciseInSession.exercise.id}>
                                                                Add Set
                                                </button>
                                                    
                                                
                                            </div>
                                        : null
                                    }
                        </div>
                    }
                    else if (exerciseInSession.session.id === currentSession.id && exerciseInSession.set_number != 0){
                        return  <>
                        <p key={exerciseInSession.id}>Set: {exerciseInSession.set_number} Load: {exerciseInSession.load} Reps: {exerciseInSession.reps} 
                            <button 
                            className="my-Button"
                            id={exerciseInSession.id}
                            onClick={(evt)=> {
                                evt.preventDefault()
                                setShowEditForm(true)
                            }}
                            >Edit Details</button>
                        </p>
                        {
                            showEditForm && exerciseInSession.id === exerciseInSession.id
                            ? <EditSetDetails newExerciseInSession={exerciseInSession} setExerciseInSession={setExInSession} currentSession={currentSession} sessionRefresh={sessionRefresh} setSessionRefresh={setSessionRefresh} showEditForm={showEditForm} setShowEditForm={setShowEditForm}/>
                            : null
                        }
                        
                        </>
                        }})
                    }
        </form>
    )
}