import React, { useEffect, useState } from "react"
import { createExerciseNote, getAllNotes, getAllTags, getNoteById } from "../AddSessionManager"


export const NoteForm = ({exerciseInSession, showNoteForm, setShowNoteForm, showTagForm, setShowTagForm, showNotes, setShowNotes}) => {
    const [ tags, setTags] =useState([])
    
    const [ newExerciseNote, setNewExerciseNote] = useState({
        exercise_in_session: exerciseInSession.id,
        description: ""
    })


    useEffect(()=> {
        getAllTags()
        .then(data => setTags(data))
    },[])



    const changeNoteState = (evt) =>{
        const newNote = Object.assign({}, newExerciseNote)
        newNote[evt.target.name] = evt.target.value
        setNewExerciseNote(newNote)
    }

    const submitNote = (evt) =>{
        evt.preventDefault()

        const newNoteObj = {
            exercise_in_session: exerciseInSession.id,
            description: newExerciseNote.description,
        }
        createExerciseNote(newNoteObj)
        .then(()=> {
            setShowNoteForm(!showNoteForm)
            setShowTagForm(true)
            setShowNotes(true)
            
        })
        
    }


    return(
        <>
            <form> 
                <div>
                    <p htmlFor="description">How did this movement feel today? Add a note, celebration, or reflection.</p>
                    <textarea onChange={changeNoteState}name="description"></textarea>
                </div>
                <button onClick={submitNote}>Submit Note</button>
            </form>


        </>
    
    )
}