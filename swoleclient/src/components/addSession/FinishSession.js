import React, { useState } from "react"
import { updateSessionToComplete } from "./AddSessionManager"

import "./AddSession.css"
import { AddRatingForm } from "./forms/AddRating"


//this includes the Finish Button which will update the Session to complete
export const FinishSession = ({ currentSession, setCurrentSession }) => {
    const[ popUpRatingForm, setPopupRatingForm] = useState(false)


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
        .then(setPopupRatingForm(true))
        
    }

    

    return(
        <>
        <div className="alignRight">
            <button onClick={completeSession}className="my-Button" id="submitSessionBtn">Finish Session</button>
        </div>
        {
            popUpRatingForm
            ? <AddRatingForm currentSession={currentSession} setCurrentSession={setCurrentSession} setPopupRatingForm={setPopupRatingForm}/>
            :null
        }
        </>
    )
}
