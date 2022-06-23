import React, { useEffect, useState } from "react"
import { getSwoleUser } from "./ProfileManage"
import "./Profile.css"
import { RatingInfo } from "./RatingInfo"

export const Profile = () => {
    const [swoleUser, setSwoleUser] = useState({})

    useEffect(()=> {
        getSwoleUser()
        .then(data=> setSwoleUser(data))
    },[])

    return(
        <>
            <h1 className="header">Hi {swoleUser.user?.first_name}! </h1>
        {
            swoleUser
            ? <RatingInfo swoleUser={swoleUser}/>
            : null
        }
        </>
    )
}