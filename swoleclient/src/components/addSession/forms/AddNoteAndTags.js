import React, { useEffect, useState } from "react"
import { createExerciseNote, getAllTags } from "../AddSessionManager"
import { NoteForm } from "./AddNoteForm"
import { TagForm } from "./AddTagForm"


export const AddNoteAndTags = ({exerciseInSession, exerciseNote, setExerciseNote, showNotes, setShowNotes, sessionRefresh, setSessionRefresh}) => {
    //const [ tags, setTags] =useState([])
    const [ showNoteForm, setShowNoteForm] = useState(true)
    const [ showTagForm, setShowTagForm ] = useState(false)


    return(
        <>
        <form>
            {
                showNoteForm
                ? <NoteForm exerciseInSession={exerciseInSession} showNoteForm={showNoteForm} setShowNoteForm={setShowNoteForm} showTagForm={showTagForm} setShowTagForm={setShowTagForm} showNotes={showNotes} setShowNotes={setShowNotes}/>
                :null
            }

            {
                showTagForm
                ? <TagForm exerciseInSession={exerciseInSession} showTagForm={showTagForm} setShowTagForm={setShowTagForm} exerciseNote={exerciseNote} setExerciseNote={setExerciseNote} sessionRefresh={sessionRefresh} setSessionRefresh={setSessionRefresh}/>
                :null
            }

            

        </form>

        </>
    
    )
}