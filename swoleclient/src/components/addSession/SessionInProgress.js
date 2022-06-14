import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { createExerciseInSession, getExerciseInSessionById, getSessions, updateSessionToComplete } from "./AddSessionManager"
import { getExercisesInSession, getSessionById } from "./AddSessionManager"
import "./AddSession.css"

//this will take current Exercise In Session id and make
// new Exercise In Session set details with that Exercise Id
export const SessionInProgress = ({ currentSession }) => {
    const [exercisesInSession, setExercisesInSession] = useState([])
    const [ sessions, setSessions ] = useState([])
    
    const [session, setSession] = useState("")
    

    const [ newExerciseInSession, setExInSession ] = useState({
        exercise: 0,
        session: currentSession.id,
        set_number: 0,
        load: 0,
        reps: 0
    })
    const history = useHistory()

    useEffect(()=>{
        getSessions()
        .then(data => setSessions(data))
    },[])


    useEffect(()=>{
        getExercisesInSession(session)
        .then(data => setExercisesInSession(data))
    },[session])

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
        //.then(() => ()) 

    }

    const completeSession = (evt) => {
        evt.preventDefault()

        const sessionObj = {
            id: currentSession.id,
            date: currentSession.date,
            rating: currentSession.rating,
            user:currentSession.user.id,
            is_complete: true
        }
        updateSessionToComplete(sessionObj)
        .then(()=> history.push("/training_log"))
    }

    return(
        <>
        <div className="alignRight">
            <button onClick={completeSession}className="my-Button" id="submitSessionBtn">Finish Session</button>
        </div>
        <form>
            {
                exercisesInSession.map(exerciseInSession => {
                    if(exerciseInSession.set_number === 0 && exerciseInSession.session.id === currentSession.id){
                        return <div className ="exerciseInSessionList">
                                    <p>{exerciseInSession.exercise.name}</p>
                                    <div className="setDetails-form">

                                        <div className="detailsInput">
                                            <label className="setNumber">Set Number:  </label>
                                            <input onChange={changeExInSessState} name="set_number" type= "number" min="1" className="setNumberInput" placeholder=""></input>
                                        </div>

                                        <div className="detailsInput">
                                            <label className="load">Load:  </label>
                                            <input onChange={changeExInSessState} name="load" type= "number" min="0"className="loadInput" placeholder="0"></input>
                                        </div>

                                        <div className="detailsInput">
                                            <label className="reps">Reps:  </label>
                                            <input onChange={changeExInSessState} name="reps"type= "number" min="1" className="RepsInput" placeholder=""></input>
                                        </div>

                                        <button onClick={(evt)=>{submitExerciseInSession(evt)}}className="my-Button"id={exerciseInSession.exercise.id}>Add Set</button>
                                    </div>
                        </div>
                }
                    else if(exerciseInSession.session.id === currentSession.id && exerciseInSession.set_number != 0){
                        return  <>
                        <p>Set: {exerciseInSession.set_number} Load: {exerciseInSession.load} Reps: {exerciseInSession.reps} <button className="my-Button">Edit Details</button></p>
                        </>
                    }
            } )
            }
        </form>
        </>
    )
}
