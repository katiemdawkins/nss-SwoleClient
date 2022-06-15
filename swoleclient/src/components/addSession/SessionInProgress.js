import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { createExerciseInSession, getExerciseInSessionById, getSessions, updateSessionToComplete } from "./AddSessionManager"
import { getExercisesInSession, getSessionById, updateSession } from "./AddSessionManager"
import "./AddSession.css"
import { AddRatingForm } from "./forms/AddRating"
import { AddSetDetails } from "./forms/AddSetDetails"

//this will take current Exercise In Session id and make
// new Exercise In Session set details with that Exercise Id
export const SessionInProgress = ({ currentSession, setCurrentSession, sessionRefresh, setSessionRefresh }) => {
    const [ showRating, setShowRating ] = useState(false)
    const [ showRatingForm, setShowRatingForm ]= useState(true)
    
    const history = useHistory()

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
        {
            showRating
            ? <p>Session Rating: {currentSession.rating}</p>
            : null
        }

        <AddSetDetails sessionRefresh ={sessionRefresh} setSessionRefresh={setSessionRefresh} currentSession={currentSession}/>

        {
            showRatingForm
                ? <AddRatingForm currentSession={currentSession} setCurrentSession= {setCurrentSession} setShowRating={setShowRating} setShowRatingForm={setShowRatingForm} />
                : null
        }
        </>
    )
}
