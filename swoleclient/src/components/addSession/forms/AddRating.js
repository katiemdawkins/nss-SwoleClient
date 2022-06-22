import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { updateSession } from "../AddSessionManager"
import '../AddSession.css'


export const AddRatingForm = ({currentSession, setCurrentSession, setShowRating, setShowRatingForm, setPopupRatingForm}) => {
    const history = useHistory()
    const changeRating = (evt) => {
        const newRating = Object.assign({}, currentSession)
        newRating[evt.target.name] = evt.target.value
        setCurrentSession(newRating)
    }
    const updateRatingForSession = (evt) => {
        evt.preventDefault()

        const sessionObj = {
            id: currentSession.id,
            date: currentSession.date,
            rating: currentSession.rating,
            user:currentSession.user.id,
            is_complete: true
        }
        updateSession(sessionObj)
        .then(()=> { history.push("/training_log")})
    }

    return(
        <div className="popupBoxRating">
            <form className="addRatingToSession">
                    <label className="rating">Before you finish, rate your session:  </label>
                    <input 
                        onChange={changeRating}
                        id="ratingInput"
                        className="my-input"
                        name="rating" 
                        type="number" 
                        min="1" max="5" 
                        placeholder="1"
                        required>
                    </input>
                    <button className="my-Button" id={currentSession.id} onClick={updateRatingForSession}>Add Rating</button>
                    <p>On a scale of 1-5, 1 = Garbage, 5 = Best Session Ever!</p>

            </form>
        </div>
    )
}