import React, { useEffect, useState } from 'react';
import { getBodyParts, getCategories, getExercises } from './ExerciseManager';

export const FilterForm = () => {
    const [categories, setCats] = useState([])
    const [bodyParts, setParts] = useState([])
    const [exercises, setExercises] = useState([])
    const [ query, setQuery ] = useState("") 
    
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

    useEffect(()=>{
        getExercises()
        .then(data=> 
            setExercises(data))
    },[])

    return (
        <article>
            <form>
                <div className="exerciseFilters">
                    <div className="searchBar">
                        <label className="searchName">Search </label>
                        <input className="searchInput"placeholder="Exercise name" onChange={exercise => setQuery(exercise.target.value)}></input>
                    </div>
                    <div>
                        <label className="searchCategory">Category </label>
                        <select>
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
                        <select>
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
                
            
            
        </article>
        
    )
}

