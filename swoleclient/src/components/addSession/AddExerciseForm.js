import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getBodyParts, getCategories, getExercises } from "../exercises/ExerciseManager"
import { createExerciseInSession } from "./AddSessionManager"


export const AddExerciseForm = ({currentSession}) => {
    const [exercises, setExercises] = useState([])
    const [ categories, setCats ] = useState([])
    const [ bodyParts, setParts ] = useState([])

    const [ currentExerciseInSession, setExInSession ] = useState({
        exercise: 0,
        session: currentSession.id,
        set_number: 0,
        load: 0,
        reps: 0
    })

    const [ exerciseName, setExerciseName ] = useState("")
    const [ category, setCategory ] = useState("")
    const [ bodyPart, setBodyPart ] = useState("")

    const history = useHistory()

    useEffect(()=>{
        getExercises(exerciseName, category, bodyPart )
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

    const changeExInSessState = (evt) => {
        const newExInSess = Object.assign({}, currentExerciseInSession)
        newExInSess[evt.target.name] = evt.target.value
        setExInSession(newExInSess)
    }

    const submitExerciseInSession = (evt) => {
        evt.preventDefault()

        const newExerciseInSession = {
            exercise: parseInt(currentExerciseInSession.exercise),
            session: parseInt(currentSession.id),
            set_number: 0,
            load: 0,
            reps: 0
        }

        createExerciseInSession(newExerciseInSession)
        //.then(() => history.push(`/training_log/addSession/${session.id}`))

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
            <div className="exercise_form">
                        <select 
                            name="exercise"
                            value={currentExerciseInSession.exercise} 
                            onChange={changeExInSessState}>
                            <option value="0"> Select an exercise...</option>
                            {exercises.map(exercise => (
                                <option key={exercise.id} value={exercise.id}> 
                                    {exercise.name} ({exercise.category.label})
                                </option>
                                ))}
                        </select>
            </div>
            <div>
                <button onClick={(evt) =>{submitExerciseInSession(evt)}}>Add Exercise</button>
            </div>
            
        </article>
    )
}