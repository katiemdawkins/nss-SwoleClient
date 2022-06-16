import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { AddExerciseForm } from "./forms/AddExerciseForm"
import { getSessionById } from "./AddSessionManager"
import { FinishSession} from "./FinishSession"
import { AddRatingForm } from "./forms/AddRating"
import { AddSetDetails } from "./forms/AddSetDetails"

export const AddToSession = () => {
    const [showAddExForm, setShowAddExForm] = useState(false)
    const [ currentSession, setCurrentSession] = useState({})
    const [ sessionRefresh, setSessionRefresh ] = useState(false)
    const [ showRating, setShowRating ] = useState(false)
    const [ showRatingForm, setShowRatingForm ]= useState(true)

    const { sessionId } = useParams()
    const history = useHistory()

    useEffect(()=> {
        getSessionById(sessionId)
        .then(data => setCurrentSession(data))
    },[sessionId])

/////////ADD delete functionality to cancel button



    return(
        <>
        <div className="addOrCancelButtons">
            <button className="my-Button" onClick={()=>{setShowAddExForm(true)}}>Add Exercise</button>
            <button className="my-Button" onClick={()=>history.push(`/training_log/addSession`)}>Cancel Session</button>
        </div>

        <div>
            <FinishSession currentSession={currentSession} />
        </div>

        {
            showRating
            ? <p>Session Rating: {currentSession.rating}</p>
            : null
        }

        <div className="addExerciseForm">
            {
                showAddExForm
                ? <AddExerciseForm currentSession = {currentSession} setShowAddExForm = {setShowAddExForm} sessionRefresh ={sessionRefresh} setSessionRefresh={setSessionRefresh}/>
                : null
            }

        </div> 

        <div>
            <AddSetDetails sessionRefresh ={sessionRefresh} setSessionRefresh={setSessionRefresh} currentSession={currentSession}/> 
        </div>

        <div>
        {
            showRatingForm
                ? <AddRatingForm currentSession={currentSession} setCurrentSession= {setCurrentSession} setShowRating={setShowRating} setShowRatingForm={setShowRatingForm} />
                : null
        }
        </div>
        

        </>
    )
}

{/* <div className="sessionInProgress">
                    {
                        currentSession.id
                        ? <SessionInProgress sessionRefresh ={sessionRefresh} setSessionRefresh={setSessionRefresh}currentSession = {currentSession} setCurrentSession={setCurrentSession} />
                        : null
                    }
        </div>  */}
