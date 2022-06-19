import React, { useEffect, useState } from "react"
import { createExerciseNote, getAllTags } from "../AddSessionManager"
import { NoteForm } from "./AddNoteForm"
import { TagForm } from "./AddTagForm"


export const AddNoteAndTags = ({exerciseInSession, exerciseNote, setExerciseNote}) => {
    //const [ tags, setTags] =useState([])
    const [ showNoteForm, setShowNoteForm] = useState(true)
    const [ showTagForm, setShowTagForm ] = useState(false)


    return(
        <>
        <form>
            {
                showNoteForm
                ? <NoteForm exerciseInSession={exerciseInSession} showNoteForm={showNoteForm} setShowNoteForm={setShowNoteForm} showTagForm={showTagForm} setShowTagForm={setShowTagForm}/>
                :null
            }

            {
                showTagForm
                ? <TagForm exerciseInSession={exerciseInSession} showTagForm={showTagForm} setShowTagForm={setShowTagForm} exerciseNote={exerciseNote} setExerciseNote={setExerciseNote}/>
                :null
            }

            

        </form>

        </>
    
    )
}