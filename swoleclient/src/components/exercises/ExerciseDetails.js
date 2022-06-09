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
            <h2>Exercise Details</h2>
            
            <div>
                <h2>{exercise.name}</h2>
                <ul>
                    <li>Category:  {exercise.category.label}</li>
                    <li>Body Part:  {exercise.body_part.label}</li> 
                    <li>Description:  {exercise.description}</li>
                </ul>
            </div>
            
        </article>
    )
}
