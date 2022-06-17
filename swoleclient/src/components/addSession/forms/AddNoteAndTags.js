import React, { useEffect, useState } from "react"
import { createExerciseNote, getAllTags } from "../AddSessionManager"
import { NoteForm } from "./AddNoteForm"
import { TagForm } from "./AddTagForm"


export const AddNoteAndTags = ({exerciseInSession}) => {
    //const [ tags, setTags] =useState([])
    const [ showNoteForm, setShowNoteForm] = useState(true)
    const [ showTagForm, setShowTagForm ] = useState(false)
    //const [ newNoteTag, setNoteTag] = useState({})

    // useEffect(()=> {
    //     getAllTags()
    //     .then(data => setTags(data))
    // },[])

    // //create function for saving tag check state
    // const changeNoteTagState = (evt) =>{
    //     const newTag = Object.assign({}, newNoteTag)
    //     newTag[evt.target.name] = evt.target.value
    //     setNoteTag(newTag)
    // }
    

    // const submitTags = (evt) => {
    //     evt.preventDefault()
        
    //     const newNoteTagsObj = {
    //         //note: exerciseInSession.id,
    //         tag: newNoteTag.id,
    //     }

        

    // }

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
                ? <TagForm exerciseInSession={exerciseInSession} showTagForm={showTagForm} setShowTagForm={setShowTagForm} />
                :null
            }

            

        </form>

        </>
    
    )
}