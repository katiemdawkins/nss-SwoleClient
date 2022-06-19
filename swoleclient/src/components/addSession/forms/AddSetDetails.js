import React, { useEffect, useState } from "react"
import { createExerciseInSession, getAllNotes, getExerciseInSessionById, getExercisesInSession, getNoteByExerciseInSessionId, updateExerciseInSession } from "../AddSessionManager"
import { AddNoteAndTags } from "./AddNoteAndTags"
import { EditSetDetails } from "./EditSetDetails"


export const AddSetDetails = ({sessionRefresh, setSessionRefresh, currentSession}) => {
    const [exercisesInSession, setExercisesInSession] = useState([])
    const [ showSetForm, setShowSetForm ] = useState(false)
    const [ showEditForm, setShowEditForm ] = useState(false)
    const [ showNoteForm, setShowNoteForm ] = useState(false)
    const [exerciseInSession, setExerciseInSession] = useState(false)
    const [ exerciseNote, setExerciseNote ] = useState({})

    const [ newExerciseInSession, setExInSession ] = useState({
        exercise: 0,
        session: currentSession.id,
        set_number: 0,
        load: 0,
        reps: 0
    })
    
    //get exercises in session from current session id 
    //then set state for exercisesInSession
    //refresh the page so they show up
    useEffect(()=>{
        getExercisesInSession(currentSession.id)
        .then(data => setExercisesInSession(data))
    },[sessionRefresh]
    )

    // useEffect(()=> {
    //     getAllNotes()
    //     .then(data=>setExerciseNotes(data))
    // },[])

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

    

//map through exercises in session
//get the exercise name to print from the first exercise in session with a set 0
//return exerciseInSession.name with + button next to it
    return(
        <form className="addExercisesAndDetails">
            {
                exercisesInSession.map(exerciseInSession => {
                    if(exerciseInSession.set_number === 0 && exerciseInSession.session.id === currentSession.id ){
                        return<div className ="exerciseInSessionList">
                                    <p>{exerciseInSession.exercise.name} 
                                        <button 
                                            className="my-Button"
                                            onClick={()=>{setShowSetForm(exerciseInSession.id)}}
                                        >+</button>
                                        <button
                                            className-="my-Button"
                                            onClick={(evt)=>{
                                                evt.preventDefault()
                                                setShowNoteForm(exerciseInSession.id)
                                                setExerciseInSession(exerciseInSession)
                                                
                                            }}
                                        >Add Note</button>
                                    </p>
                                    {
                                        showNoteForm == exerciseInSession.id
                                        ? <AddNoteAndTags  exerciseInSession={exerciseInSession} exerciseNote={exerciseNote} setExerciseNote={setExerciseNote}/>
                                        :null
                                    }

                                    {
                                        showSetForm == exerciseInSession.id
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
                        <div className="setDetailsList">
                            <ul>
                                <li  key={exerciseInSession.id}>Set: {exerciseInSession.set_number} Load: {exerciseInSession.load} Reps: {exerciseInSession.reps} 
                                    <button 
                                    className="my-Button"
                                    id={exerciseInSession.id}
                                    onClick={(evt)=> {
                                        evt.preventDefault()
                                        setShowEditForm(exerciseInSession.id)
                                    }}
                                    >Edit Details</button>
                                </li>
                            </ul>
                        </div>
                        {
                            showEditForm == exerciseInSession.id 
                            ? <EditSetDetails newExerciseInSession={exerciseInSession} setExerciseInSession={setExInSession} currentSession={currentSession} sessionRefresh={sessionRefresh} setSessionRefresh={setSessionRefresh} showEditForm={showEditForm} setShowEditForm={setShowEditForm}/>
                            : null
                        }
                        
                        </>
                        }})
                    }
                    
        </form>
    )
}
// {
//     exerciseNotes.map(note => {
//         if (note.exercise_in_session.id === exerciseInSession.id){
//             return <p>{note.description}</p>
//         }
//     })
// }