import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getSessions } from "./TrainingLogManager"
import './TL.css'
import { deleteSession } from "../addSession/AddSessionManager"

export const TrainingLog = () => {
    const [sessions, setSessions] = useState([])

    const {userId} = useParams()
    
    const sessionState = () => {
        getSessions(userId)
        .then(data=> setSessions(data))
    }

    useEffect(()=>{
        sessionState()
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
                return <section key={session.id} className="sessionSummaryBox">
                    <p>Session Summary</p>
                    <p>Date: {session.date}</p>
                    <p>Rating: {session.rating}</p>
                    
                    {
                        session.Exercises_in_Session.map(exercise_in_session => {
                            if(exercise_in_session.set_number === 1){
                                return <p key={exercise_in_session.exercise.id}>{exercise_in_session.exercise.name}</p>
                            }
                        })
                    }
                    <button onClick={()=>{onDeleteClick(session.id)}}className="my-Button">Delete Session</button>
                    </section>
            })
    
        }
        </>
    )

}