import React, { useEffect, useState } from "react"
import { createExerciseNote, getAllNotes, getAllTags, getLastNote, updateNote } from "../AddSessionManager"
import { NoteForm } from "./AddNoteForm"


export const TagForm = ({ exerciseInSession, showTagForm, setShowTagForm }) => {
    const [ tags, setTags] = useState([])
    
    const [ currentNote, setCurrentNote] = useState({})
    const [ tagState, setTagState ] = useState([])

    
useEffect(()=> {
        getAllTags()
        .then(data => setTags(data))
    },[])

    //get just created note
    useEffect(()=> {
        getLastNote()
        .then(data=> setCurrentNote(data))
    },[])



    const handleChange = (evt) => {
        const copy = tagState
        
        console.log(evt.target.value)

        const index = copy.indexOf(evt.target.value)
        if(index == -1){
            copy.push(evt.target.value)
        } else{
            copy.splice(index)
        }
        setTagState(copy)

    }

    
    

    const submitTags = (evt) => {
        evt.preventDefault()

    
        const updatedNote = {
            id: currentNote.id,
            exercise_in_session: currentNote.exercise_in_session.id,
            description: currentNote.description,
            tags: tagState
        }

        updateNote(updatedNote)
        .then(()=> setShowTagForm(false))

        

    }

    return(
        <>
        <form>
            <div>
                <label htmlFor="tags">Add Note Tags</label>
            </div>
            <div>
                {tags.map(tag => {
                    return <>
                    <input
                        type="checkbox"
                        id="tags"
                        value={tag.id}
                        className="tagsCheckBox"
                        onChange={handleChange}
                        />
                        <label key={tag.id}>{tag.label}</label>
                    
                    </>
                })}
            </div>
            <button onClick={submitTags}>AddTags</button>
        </form>

        </>
    
    )
}