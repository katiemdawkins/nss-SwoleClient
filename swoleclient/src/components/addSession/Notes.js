import React, { useEffect, useState } from "react"
import { getAllNotes, getExercisesInSession } from "./AddSessionManager"

export const Notes = ({currentSession}) => {
    //get notes that match current user and exercise in session id for this session
    //get current session
    //get current user

    const [ sessionNotes, setSessionNotes] = useState([])
    const [ exercisesInSession, setExercisesInSession] = useState([])

    //exercises in session by session
    useEffect(()=> {
        getExercisesInSession(currentSession.id)
        .then(data=>setExercisesInSession(data))
    },[currentSession.id]
    )

    useEffect(()=>{
        getAllNotes()
        .then(data=> setSessionNotes(data))
    },[]
    )
    
    return(
        <>
        <h3>Notes</h3>
        {
            sessionNotes.map(sessionNote => {
            if(sessionNote.exercise_in_session.session.id === currentSession.id){
                return <p>{sessionNote.exercise_in_session.exercise.name}: {sessionNote.description}</p>
            }
            })
        }
        </>
    )
}
