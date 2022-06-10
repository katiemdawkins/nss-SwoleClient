import React, { useEffect, useState } from "react"



export const AddRatingForm = () => {
    return(
        <form>
            <div>
                <p>On a scale of 1-5, 1 being garbage, 5 being amazing, how would you rate your session today?</p>
                <label className="sessionRating">Rating</label>
                <input type= "number" min="1" max="5"className="setNumberInput" placeholder=""></input>
                <button>Add Rating</button>
            </div>
        </form>
    )
}