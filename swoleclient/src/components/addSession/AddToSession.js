import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { AddExerciseForm } from "./AddExerciseForm"
import { createSession, getExercisesInSession, getSessionById, getSessions } from "./AddSessionManager"

export const AddToSession = () => {
    const [showAddExForm, setShowAddExForm] = useState(false)
    const [ currentSession, setCurrentSession] = useState({})
    const [ exercisesInSession, setExercisesInSession] = useState([])

    const { sessionId } = useParams()
    const history = useHistory()

    useEffect(()=> {
        getSessionById(sessionId)
        .then(data => setCurrentSession(data))
    },[sessionId])

    useEffect(()=> {
        getExercisesInSession()
        .then(data => setExercisesInSession(data))
    },[])

    return(
        <>
        <div>
            <button onClick={()=>{setShowAddExForm(true)}}>Add Exercise</button>
            <button onClick={()=>history.push(`/training_log/addSession`)}>Cancel Session</button>
        </div>

        <div className="addExerciseForm">
            {
                showAddExForm
                ? <AddExerciseForm currentSession = {currentSession}/>
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