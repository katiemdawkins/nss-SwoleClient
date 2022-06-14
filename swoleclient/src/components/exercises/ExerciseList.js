import React, { useEffect, useState } from "react"
import { getExercises, getBodyParts, getCategories } from "./ExerciseManager"
import { Link, useHistory } from "react-router-dom"
import { FilterForm } from "./FilterForm"
import { Calendar } from "antd"




export const ExerciseList = () => {
    const [ exercises, setExercises ]= useState([])
    const [ categories, setCats ] = useState([])
    const [ bodyParts, setParts ] = useState([])


    const [ exerciseName, setExerciseName ] = useState("")
    const [ category, setCategory ] = useState("")
    const [ bodyPart, setBodyPart ] = useState("")
 
    

    useEffect(()=>{
        getExercises(exerciseName, category, bodyPart)
            .then(data=>
                setExercises(data))
    },[exerciseName, category, bodyPart])

    useEffect(()=>{
        getCategories()
        .then(data =>
            setCats(data))

    },[])

    useEffect(()=>{
        getBodyParts()
        .then(data =>
            setParts(data))

    },[])

    const clearState = (e) => {
        e.preventDefault()
        setExerciseName("")
        setCategory("")
        setBodyPart("")
    }

    return(
        <article className="exercises">
            <h2>Exercises</h2>
            <div className="filterForm">
                <form>
                    <div className="exerciseFilters">
                        <div className="searchBar">
                            <label className="searchName">Search </label>
                            <input className="searchInput"placeholder="Exercise name" onChange={e => setExerciseName(e.target.value)}></input>
                        </div>
                        <div>
                            <label className="searchCategory">Category </label>
                            <select onChange={e => setCategory(e.target.value)}>
                                <option value="0">Select...</option>
                                {
                                    categories.map(cat => {
                                        return <option value={cat.id} key={cat.id}>
                                            {cat.label}
                                            </option>
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label className="searchCategory">Body Part </label>
                            <select onChange={e => setBodyPart(e.target.value)}>
                                <option value="0">Select...</option>
                                {
                                    bodyParts.map(part => {
                                        return <option value={part.id} key={part.id}>
                                            {part.label}
                                            </option>
                                    })
                                }
                            </select>
                        </div>
                        <button onClick={(e)=> clearState(e)}>Clear Filters</button>
                    </div>
                </form>
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
