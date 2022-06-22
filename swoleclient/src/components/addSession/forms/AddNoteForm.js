import React, { useEffect, useState } from "react"
import { createExerciseNote, getAllNotes, getAllTags, getNoteById } from "../AddSessionManager"


export const NoteForm = ({exerciseInSession, showNoteForm, setShowNoteForm, setShowTagForm, setShowNotes, sessionRefresh, setSessionRefresh}) => {
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
                    <p htmlFor="description">  Notes for this exercise... </p>
                    <textarea className="my-input"onChange={changeNoteState}name="description"></textarea>
                </div>
                <button className= "my-Button"onClick={submitNote}>Submit Note</button>
            </form>


        </>
    
    )
}