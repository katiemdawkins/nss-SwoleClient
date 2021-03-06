import React, { useState } from "react"
import { useHistory } from "react-router"
import { createSession } from "./AddSessionManager"

export const StartSession = () => {

    const [ currentSession, setCurrentSession] = useState({date: ""})
    
    const history = useHistory()

    
    const submitSession = (evt) => {
        evt.preventDefault()

        const newSession = {
            date: currentSession.date
        }

        createSession(newSession)
        .then((sentSession) => history.push(`/training_log/addSession/${sentSession.id}`))

    }
    
    return(
        <>
        <section className="mainBitCenter">
            <h2>Log Your Sessions</h2>
                <div className="startSession">
                    <button  className="my-Button"onClick={(evt)=> {

                        
                        setCurrentSession({date:""})
                        submitSession(evt)
                    }}>Start a New Session</button>
                </div>

        </section>
        </>
    )
}

