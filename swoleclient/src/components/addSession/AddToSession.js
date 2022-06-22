import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { AddExerciseForm } from "./forms/AddExerciseForm"
import {  getSessionById } from "./AddSessionManager"
import { FinishSession} from "./FinishSession"
import { AddSetDetails } from "./forms/AddSetDetails"
import { Notes } from "./Notes"

export const AddToSession = () => {
    const [showAddExForm, setShowAddExForm] = useState(false)
    const [ currentSession, setCurrentSession] = useState({})
    const [ sessionRefresh, setSessionRefresh ] = useState(false)
    const[ showNotes, setShowNotes ] = useState(false)

    const { sessionId } = useParams()
    const history = useHistory()

    useEffect(()=> {
        getSessionById(sessionId)
        .then(data => setCurrentSession(data))
    },[sessionId])


    return(
        <>
        <div className="addOrCancelButtons">
            <button className="my-Button" onClick={()=>{setShowAddExForm(true)}}>Add Exercise</button>
            <button className="my-Button" onClick={()=> history.push(`/`)}>Cancel Session</button>
        </div>

        <div className="finishSession-btn">
            <FinishSession currentSession={currentSession} setCurrentSession={setCurrentSession} />
        </div>

        
        <div className="exerciseAndSets">
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
        </div>
        
        <div>
            <Notes currentSession={currentSession} sessionRefresh={sessionRefresh} setSessionRefresh={setSessionRefresh}/>
        </div>

        </>
    )
}


