import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCurrentUser, getSessions } from "./TrainingLogManager"
import './TL.css'
import { deleteSession } from "../addSession/AddSessionManager"

export const TrainingLog = () => {
    const [sessions, setSessions] = useState([])

    // use state for current user ({})
    const [currentUser, setCurrentUser] = useState({})

    //get/set current user state
    useEffect(()=>{
        getCurrentUser()
        .then(data => setCurrentUser(data))
    }, [])
    
    const sessionState = () => {
        getSessions(currentUser)
        .then(data=> setSessions(data))
    }

    useEffect(()=>{
        getSessions()
        .then(data=> setSessions(data))
    },[])

    const onDeleteClick = (sessionId) => {
        return deleteSession(sessionId)
        .then(data => {
            sessionState(data)
        })
    }

    return(
        <>
        <h2>Training Log</h2>
        {
            sessions.map(session => {
                if(session.user.id === currentUser.id){
                return <section key={session.id} className="sessionSummaryBox">
                    <p>Session Summary</p>
                    <p>Date: {session.date}</p>
                    <p>Rating: {session.rating}</p>
                    
                    {
                        session.Exercises_in_Session.map(exercise_in_session => {
                            if(exercise_in_session.set_number === 0){
                                return <p key={exercise_in_session.exercise.id}>{exercise_in_session.exercise.name}</p>
                            }
                        })
                    }
                    <button onClick={()=>{onDeleteClick(session.id)}}className="my-Button">Delete Session</button>
                    </section>

                }
            })
    
        }
        </>
    )

}