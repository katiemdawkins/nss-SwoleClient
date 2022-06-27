import React, { useEffect, useState } from "react"
import { updateExerciseInSession } from "../AddSessionManager"

export const EditSetDetails = ({ newExerciseInSession, setExerciseInSession, currentSession, sessionRefresh, setSessionRefresh, showEditForm, setShowEditForm }) => {
    const [ updatedExerciseInSession, setUpdatedExerciseInSession ] = useState({})
    
    //useEffect for getExerciseInSession
    useEffect(()=>{
        setUpdatedExerciseInSession(newExerciseInSession)
    },[])

    
    const editExerciseInSessionState = (evt) => {
        const editedEx = Object.assign({}, updatedExerciseInSession)
        editedEx[evt.target.name] = evt.target.value
        setUpdatedExerciseInSession(editedEx)
    }

    const editExerciseInSession = (evt) => {
        evt.preventDefault()

        const editedExerciseInSessionObj = {
            id: parseInt(updatedExerciseInSession.id),
            exercise: parseInt(updatedExerciseInSession.exercise.id),
            session: parseInt(currentSession.id),
            set_number: parseInt(updatedExerciseInSession.set_number),
            load: parseInt(updatedExerciseInSession.load),
            reps: parseInt(updatedExerciseInSession.reps)
        }

        updateExerciseInSession(editedExerciseInSessionObj)
        .then(() => {
            setSessionRefresh(!sessionRefresh)
            setShowEditForm(false)
        }) 

    }

    return(
        <>
        <form className="editSetDetailsForm">
            <div className="setDetails-form">

            <div className="detailsInput">
                <label className="setNumber">Set Number:  </label>
                <input 
                    onChange={editExerciseInSessionState} 
                    name="set_number" 
                    type= "number" 
                    min="1" 
                    className="my-input" 
                    defaultValue={newExerciseInSession.set_number}
                    
                    required>
                </input>
            </div>

            <div className="detailsInput">
                <label className="load">Load:  </label>
                <input 
                    onChange={editExerciseInSessionState} 
                    name="load" 
                    type= "number" 
                    min="0"
                    className="my-input" 
                    defaultValue={newExerciseInSession.load}
                    required>
                </input>
            </div>

            <div className="detailsInput">
                <label className="reps">Reps:  </label>
                <input 
                    onChange={editExerciseInSessionState} 
                    name="reps"
                    type= "number" 
                    min="1" 
                    className="my-input" 
                    defaultValue={newExerciseInSession.reps}
                    required>
                </input>
            </div>

            <button 
                onClick={(evt)=>{
                    editExerciseInSession(evt)
                    setShowEditForm(!showEditForm)
                }}
                className="my-Button"
                id={newExerciseInSession.id}>
                    Update Set Details
            </button>
            </div>
        </form>
        </>
    )
}


