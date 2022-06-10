import React, { useEffect, useState } from "react"



export const AddSetDetailsForm = () => {
    return(
        <form>
            <div>
                <label className="setNumber">Set Number</label>
                <input type= "number" min="1" className="setNumberInput" placeholder=""></input>
                <label className="load">Load</label>
                <input type= "number" min="0"className="loadInput" placeholder="0"></input>
                <label className="reps">Reps</label>
                <input type= "number" min="1" className="RepsInput" placeholder=""></input>
                <button>Add Set</button>
            </div>
        </form>
    )
}