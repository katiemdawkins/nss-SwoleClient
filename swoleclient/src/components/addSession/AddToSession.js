import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { AddExerciseForm } from "./forms/AddExerciseForm"
import { deleteSession, getSessionById } from "./AddSessionManager"
import { FinishSession} from "./FinishSession"
import { AddRatingForm } from "./forms/AddRating"
import { AddSetDetails } from "./forms/AddSetDetails"
import { Notes } from "./Notes"

export const AddToSession = () => {
    const [showAddExForm, setShowAddExForm] = useState(false)
    const [ currentSession, setCurrentSession] = useState({})
    const [ sessionRefresh, setSessionRefresh ] = useState(false)
    const [ showRating, setShowRating ] = useState(false)
    const [ showRatingForm, setShowRatingForm ]= useState(true)
    const[ showNotes, setShowNotes ] = useState(false)

    const { sessionId } = useParams()
    const history = useHistory()

    useEffect(()=> {
        getSessionById(sessionId)
        .then(data => setCurrentSession(data))
    },[sessionId])

/////////ADD delete functionality to cancel button

// const cancelSession= (sessionId)=> {
//     return deleteSession(sessionId)
//     .then(()=> history.push(`/training_log/addSession`))
// }



    return(
        <>
        <div className="addOrCancelButtons">
            <button className="my-Button" onClick={()=>{setShowAddExForm(true)}}>Add Exercise</button>
            <button className="my-Button" onClick={()=> history.push(`/training_log/addSession`)}>Cancel Session</button>
        </div>

        <div className="finishSession-btn">
            <FinishSession currentSession={currentSession} />
        </div>

        <div className="showSessionRating">
            {
                showRating
                ? <p>Session Rating: {currentSession.rating}</p>
                : null
            }
        </div>

        <div className="addExerciseForm">
            {
                showAddExForm
                ? <AddExerciseForm currentSession = {currentSession} setShowAddExForm = {setShowAddExForm} sessionRefresh ={sessionRefresh} setSessionRefresh={setSessionRefresh}/>
                : null
            }

        </div> 

        <div className="setDetailsSection">
            <AddSetDetails sessionRefresh ={sessionRefresh} setSessionRefresh={setSessionRefresh} currentSession={currentSession} showNotes={showNotes} setShowNotes={setShowNotes}/> 
        </div>

        <div className="ratingForm">
        {
            showRatingForm
                ? <AddRatingForm currentSession={currentSession} setCurrentSession= {setCurrentSession} setShowRating={setShowRating} setShowRatingForm={setShowRatingForm} />
                : null
        }
        </div>
        <div>
            <Notes currentSession={currentSession} sessionRefresh={sessionRefresh} setSessionRefresh={setSessionRefresh}/>
        </div>

        </>
    )
}


