import React, { useEffect, useState } from "react"
import { getExerciseById } from "./ExerciseManager"
import { useParams } from "react-router-dom"




export const ExerciseDetails = () => {
    const[ exercise, setExercise]= useState({}) 
    
    const{ exerciseId } = useParams()

    useEffect(()=>{
        getExerciseById(exerciseId)
        .then(data =>
            setExercise(data))
    },[])

    return(
        <article className="exercises">
            <h2 className="header">Exercise Details</h2>
            
            <div className="exDetails">
                <h2>{exercise.name}</h2>
                <ul className="noDecoration">
                    <li className="detailsList">Category:  {exercise.category?.label}</li>
                    <li className="detailsList">Body Part:  {exercise.body_part?.label}</li>
                    <li className="detailsList">Description:  {exercise.description}</li>
                </ul>
            </div>
            
        </article>
    )
}

