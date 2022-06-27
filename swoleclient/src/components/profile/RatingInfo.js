import React, { useEffect, useState } from "react"
import "./Profile.css"
import {  getSessionsForAverageRating} from "./ProfileManage"


export const RatingInfo = ({swoleUser}) => {

    const [usersCompleteSessions, setUsersSessions] = useState([])

    //get completed sessions for current swoleUser
    useEffect(()=> {
        getSessionsForAverageRating(swoleUser?.id)
        .then(data => setUsersSessions(data))
    },[swoleUser])



    return(
    <>

    <div className="ratingInfo">
        <h3 className="centerText">Here's how you've been feeling about your sessions lately...</h3>
        {
            usersCompleteSessions.map((usersCompleteSession, i)=>{
                if(i===0){
                    return <p>Average Session Rating: {usersCompleteSession.averageRating} </p>
                }
            })
        }
        <p>Where 1 = Garbage and 5 = Best Session Ever </p>
    </div>
    </>
)
}