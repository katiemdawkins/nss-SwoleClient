import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { createExerciseInSession, getSessions, updateSessionToComplete } from "./AddSessionManager"
import { getExercisesInSession, getSessionById, updateSession } from "./AddSessionManager"
import "./AddSession.css"
import { AddRatingForm } from "./forms/AddRating"
import { AddSetDetails } from "./forms/AddSetDetails"

//this includes the Finish Button which will update the Session to complete
export const FinishSession = ({ currentSession }) => {
    
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
        </>
    )
}
