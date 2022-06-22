import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../traininglog/TrainingLogManager"
import "./Profile.css"
import { getCompletedSessions, getSessionsForAverageRating, getSessionsForRatings } from "./ProfileManage"


export const RatingInfo = ({swoleUser}) => {

    const [currentUser, setCurrentUser] = useState({})
    const [usersCompleteSessions, setUsersSessions] = useState([])

    
    useEffect(()=>{
        getCurrentUser()
        .then(data => setCurrentUser(data))
    }, [])

    //get completed sessions and set is Complete
    useEffect(()=> {
        getSessionsForAverageRating()
        .then(data => setUsersSessions(data))
    },[])



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