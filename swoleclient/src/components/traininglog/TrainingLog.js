import React, { useEffect, useState } from "react"
import { getCurrentUser, getSessionById, getSessions } from "./TrainingLogManager"
import './TL.css'
import { deleteSession } from "../addSession/AddSessionManager"
import { useHistory } from "react-router-dom"

export const TrainingLog = () => {
    
    const [currentUser, setCurrentUser] = useState({})
    const [sessions, setSessions] = useState([])
    
    const history = useHistory()

    //get/set current user state
    useEffect(()=>{
        getCurrentUser()
        .then(data => setCurrentUser(data))
    }, [])


    const sessionState = () => {
        getSessions(currentUser.id)
        .then(data=> 
            setSessions(data))
    }

    useEffect(()=>{
        sessionState()
        
    },[currentUser])

    const onDeleteClick = (sessionId) => {
        return deleteSession(sessionId)
        .then((data) =>{
            sessionState(data)
        })
    }




    return(
        <>
        <h2 className="logHeading">Hi {currentUser.user?.first_name}! Here's Your Training Log</h2>
        {
            sessions.map(session => {
                if(session.user.id === currentUser.id && session.is_complete===true){
                return <section key={session.id} className="sessionSummaryBox">
                    <h4>Session Summary</h4>
                    <p><strong>Date: </strong>{session.date}</p>
                    <p><strong>Rating: </strong>{session.rating}</p>
                    <p><strong>Exercises...</strong></p>
                    <ul>
                    
                    {
                        session.Exercises_in_Session.map(exercise_in_session => {
                            if(exercise_in_session.set_number === 0){
                                return <li className="logExerciseList"key={exercise_in_session.exercise.id}>{exercise_in_session.exercise.name}</li>
                            }
                        })
                    }
                    </ul>
                    <button onClick={()=>{onDeleteClick(session.id)}}className="my-Button">Delete Session</button>
                    <button onClick={()=> history.push(`/training_log/${session.id}`)}className="my-Button">See Details</button>
                    </section>

                }
            })
            
        }

        </>
    )

}