import React, { useEffect, useState } from "react"
import { createExerciseNote, getAllNotes, getAllTags, getLastNote, getNoteByExerciseInSessionId, updateNote } from "../AddSessionManager"
import { NoteForm } from "./AddNoteForm"


export const TagForm = ({ exerciseInSession, showTagForm, setShowTagForm, exerciseNote, setExerciseNote, sessionRefresh, setSessionRefresh, setRefreshNotes }) => {
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

    const getTheNote = (id) =>{
        getNoteByExerciseInSessionId(id)
        .then(data => setExerciseNote(data))
    }
    

    const submitTags = () => {


    
        const updatedNote = {
            id: currentNote.id,
            exercise_in_session: currentNote.exercise_in_session.id,
            description: currentNote.description,
            tags: tagState
        }

        updateNote(updatedNote)
        .then(()=> {
            setShowTagForm(false)
            getTheNote(exerciseInSession.id)
            setRefreshNotes(true)
        })

        

    }

    return(
        <>
        <form>
            <div className="bottomSpace">
                <label  htmlFor="tags"><strong>Add Additional Details</strong></label>
            </div>
            <div className="tagsDisplay">
                {tags.map(tag => {
                    return <>
                    <div className="checkboxItem">
                    <input
                        type="checkbox"
                        id="tags"
                        value={tag.id}
                        className="tagsCheckBox"
                        onChange={handleChange}
                        />
                        <label className="tagList" key={tag.id}>
                            {tag.label}   </label>
                    </div>
                    </>
                })}
            </div>
            <button className="my-Button"onClick={submitTags}>Submit</button>
        </form>

        </>
    
    )
}