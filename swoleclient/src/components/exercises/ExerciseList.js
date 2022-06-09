import React, { useEffect, useState } from "react"
import { getExercises } from "./ExerciseManager"
import { Link, useHistory } from "react-router-dom"




export const ExerciseList = () => {
    const[ exercises, setExercises]= useState([])
    const [ query, setQuery ] = useState("") 

    const exerciseState = () => {
        getExercises()
        .then((data) => {
            setExercises(data)
        })
    }

    useEffect(()=>{
        exerciseState()
    },[])

    return(
        <article className="exercises">
            <h2>Exercises</h2>
            
                <div className="searchBar">
                    <label className="searchName">Search</label>
                    <input className="searchInput"placeholder="Exercise name" onChange={exercise => setQuery(exercise.target.value)}></input>
                </div>
            
            {
                exercises.map(exercise => {
                    return <section key={`exercise--${exercise.id}`}>
                        <div className="exercise__name"><Link className="exerciseLink" to={`/exercises/${exercise.id}`}>{exercise.name} ({exercise.category.label})</Link></div>
                    </section>
                })
            }
            
        </article>
    )
}
