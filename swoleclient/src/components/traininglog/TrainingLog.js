import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getSessions } from "./TrainingLogManager"
import './TL.css'

export const TrainingLog = () => {
    const [sessions, setSessions] = useState([])

    const {userId} = useParams()
    
    useEffect(()=>{
        getSessions(userId)
        .then(data =>
            setSessions(data))
    },[])

    return(
        <>
        <h2>Training Log</h2>
        {
            sessions.map(session => {
                return <section key={session.id} className="sessionSummaryBox">
                    <p>Session Number: {session.id}</p>
                    <p>Date {session.date}</p>
                    <p>Rating {session.rating}</p>
                    </section>
            })
      
      }
      </>
    )

}