import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getBodyParts, getCategories, getExercises } from "../../exercises/ExerciseManager"
import { createExerciseInSession } from "../AddSessionManager"


export const AddExerciseForm = ({currentSession, setShowAddExForm, sessionRefresh, setSessionRefresh}) => {
    const [exercises, setExercises] = useState([])
    const [ categories, setCats ] = useState([])
    const [ bodyParts, setParts ] = useState([])

    

    const [ newExerciseInSession, setExInSession ] = useState({
        exercise: 0,
        session: currentSession.id,
        set_number: 0,
        load: 0,
        reps: 0
    })

    //const [exercisesInSession, setExercisesInSession] = useState([])

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
        const newEx = Object.assign({}, newExerciseInSession)
        newEx[evt.target.name] = evt.target.value
        setExInSession(newEx)
    }

    const submitExerciseInSession = (evt) => {
        evt.preventDefault()

        const newExerciseInSessionObj = {
            exercise: parseInt(newExerciseInSession.exercise),
            session: currentSession.id,
            set_number: 0,
            load: 0,
            reps: 0
        }

        createExerciseInSession(newExerciseInSessionObj)
        .then(() => {
            setSessionRefresh(!sessionRefresh)
            setShowAddExForm(false)
        
        }) 

    }

    return(
        <article className="addExerciseToSessionForm">
            <h2>Exercises</h2>
            <div className="ExerciseToSessionForm">
                <div className="filterForm">
                    <form>
                        <div className="exerciseFilters">
                            <div className="searchBar">
                                <label className="searchName">Search </label>
                                <input className="my-input" placeholder="Exercise name" onChange={e => setExerciseName(e.target.value)}></input>
                            </div>
                            <div>
                                <label className="searchCategory">Category </label>
                                <select className="my-dropdown" onChange={e => setCategory(e.target.value)}>
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
                                <select className="my-dropdown" onChange={e => setBodyPart(e.target.value)}>
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
                        </div>
                    </form>
                </div>
                <div className="exercise_form">
                    <label>Select an exercise: </label>
                            <select 
                                className="my-dropdown"
                                name="exercise"
                                value={newExerciseInSession.exercise} 
                                onChange={changeExInSessState}>
                                <option value="0"> Select an exercise...</option>
                                {exercises.map(exercise => (
                                    <option key={exercise.id} value={exercise.id}> 
                                        {exercise.name} ({exercise.category.label})
                                    </option>
                                    ))}
                            </select>
                </div>
                <div id="leftBtn">
                    <button  className="my-Button" onClick={(e)=> clearState(e)}>Clear Filters</button>
                </div>
                <div id="rightBtn">   
                    <button  className="my-Button" onClick={(evt) =>{submitExerciseInSession(evt)}}>Add Exercise</button>
                </div>
            </div>
        </article>
    )
}