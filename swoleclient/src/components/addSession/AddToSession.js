import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { AddExerciseForm } from "./forms/AddExerciseForm"
import { createSession, getExercisesInSession, getSessionById, getSessions } from "./AddSessionManager"
import { SessionInProgress } from "./SessionInProgress"

export const AddToSession = () => {
    const [showAddExForm, setShowAddExForm] = useState(false)
    const [ currentSession, setCurrentSession] = useState({})
    const [ sessionRefresh, setSessionRefresh ] = useState(false)

    const { sessionId } = useParams()
    const history = useHistory()

    useEffect(()=> {
        getSessionById(sessionId)
        .then(data => setCurrentSession(data))
    },[sessionId])

/////////ADD delete functionality to cancel button

    return(
        <>
        <div className="addOrCancelButtons">
            <button className="my-Button" onClick={()=>{setShowAddExForm(true)}}>Add Exercise</button>
            <button className="my-Button" onClick={()=>history.push(`/training_log/addSession`)}>Cancel Session</button>
        </div>

        <div className="addExerciseForm">
            {
                showAddExForm
                ? <AddExerciseForm currentSession = {currentSession} setShowAddExForm = {setShowAddExForm} sessionRefresh ={sessionRefresh} setSessionRefresh={setSessionRefresh}/>
                : null
            }

        </div> 
        <div className="sessionInProgress">
                    {
                        currentSession.id
                        ? <SessionInProgress sessionRefresh ={sessionRefresh} setSessionRefresh={setSessionRefresh}currentSession = {currentSession} setCurrentSession={setCurrentSession} />
                        : null
                    }
        </div> 

        

        </>
    )
}


{/* <div className="exerciseInSessionList">
{
    exerciseInSession.session.id === currentSession.id
    ? <p>{exercisesInSession.exercise.name}</p>
    : null
}

</div>  */}