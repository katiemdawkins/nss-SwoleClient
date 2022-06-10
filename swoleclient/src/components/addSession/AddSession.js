import React, { useEffect, useState } from "react"

export const AddSession = () => {
    const [showButtons, setShowButtons ] = useState(false)
    const startSession = () => {
        
    }
    return(
        <>
        <h2>Log Your Sessions</h2>
        <div className="startSession">
            <button onClick={()=>{setShowButtons(true)}}>Start a New Session</button>
        </div>
        <div className="startSession">
            {
                showButtons
                ? <><button>Add Exercise</button>
                    <button onClick={()=>{setShowButtons(false)}}>Cancel Session</button></>
                : null
            }
        </div>

        
        </>
    )
}