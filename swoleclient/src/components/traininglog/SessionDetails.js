import React, { useEffect, useState } from "react"
import { getSessionById } from "./TrainingLogManager"
import './TL.css'
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { getAllNotes } from "../addSession/AddSessionManager"


export const SessionDetails = () => {

    const [ session, setSession ] = useState({})
    const [notes, setNotes ] = useState([])
    const {sessionId} = useParams()
    const history = useHistory()

    useEffect(()=>{

        getSessionById(sessionId)
        .then(data=>{
            setSession(data)
        })

    },[])

    useEffect(()=>{
        
        getAllNotes(sessionId)
        .then(data=>{
            setNotes(data)
        })
    },[sessionId])

    return(
        <>
        <div className="SessionDetailsPopUp">
            <h3>Session Details | {session.date}</h3>
            <h4>Rating: {session.rating}</h4>
            {
                session.Exercises_in_Session?.map(exercise_in_session => {
                    if(exercise_in_session?.set_number === 0){
                        return <p><strong>{exercise_in_session.exercise.name}</strong> </p>
                    }
                    else if(exercise_in_session?.set_number != 0){
                        return <p>Set: {exercise_in_session.set_number} / Reps: {exercise_in_session.reps} / Load: {exercise_in_session.load}</p>
                    }
                })
            }
            <h4>Notes...</h4>
            {
                notes?.map(note =>{
                    return <>
                    <p><strong>{note.exercise_in_session.exercise?.name} </strong></p>
                    <p>{note.description}</p>
                    {
                        note.tags.map(tag=>{
                            return <p>Details: {tag.label}</p>
                        })
                    }
                    </>
                    
                })
            }
    
        <button onClick={()=> history.push(`/training_log`)}className="my-Button">Back to Training Log</button>
        </div>
        </>
)
}



