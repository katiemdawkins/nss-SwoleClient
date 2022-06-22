import React, { useEffect, useState } from "react"
import { getCurrentUser } from "../traininglog/TrainingLogManager"
import "./Profile.css"
import { getCompletedSessions, getSessionsForRatings } from "./ProfileManage"


export const RatingInfo = ({swoleUser}) => {

    const [currentUser, setCurrentUser] = useState({})
    //const [ aveRating, setAveRating] = useState("")
    const [usersCompleteSessions, setUsersSessions] = useState([])

    
    useEffect(()=>{
        getCurrentUser()
        .then(data => setCurrentUser(data))
    }, [])

    //get completed sessions and set is Complete
    useEffect(()=> {
        getCompletedSessions()
        .then(data =>setUsersSessions(data))
    },[])



    return(
    <>

    <div className="ratingInfo">
        <h3 className="centerText">Here's how you've been feeling about your sessions lately...</h3>
        <p>Average Session Rating:   </p>
        <p>Where 1 = Garbage and 5 = Best Session Ever </p>
    </div>
    </>
)
}