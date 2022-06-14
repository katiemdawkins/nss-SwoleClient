import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { AddExerciseForm } from "./AddExerciseForm"
import { createSession, getExercisesInSession, getSessionById, getSessions } from "./AddSessionManager"
import { SessionInProgress } from "./SessionInProgress"

export const AddToSession = () => {
    const [showAddExForm, setShowAddExForm] = useState(false)
    const [ currentSession, setCurrentSession] = useState({})

    const { sessionId } = useParams()
    const history = useHistory()

    useEffect(()=> {
        getSessionById(sessionId)
        .then(data => setCurrentSession(data))
    },[sessionId])



    return(
        <>
        <div className="addOrCancelButtons">
            <button className="my-Button" onClick={()=>{setShowAddExForm(true)}}>Add Exercise</button>
            <button className="my-Button" onClick={()=>history.push(`/training_log/addSession`)}>Cancel Session</button>
        </div>

        <div className="addExerciseForm">
            {
                showAddExForm
                ? <AddExerciseForm currentSession = {currentSession} setShowAddExForm = {setShowAddExForm}/>
                : null
            }

        </div> 
        <div className="sessionInProgress">
                    {
                        currentSession.id
                        ? <SessionInProgress currentSession = {currentSession} />
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