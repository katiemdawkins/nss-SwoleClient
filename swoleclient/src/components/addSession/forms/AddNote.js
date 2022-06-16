import React, { useEffect, useState } from "react"
import { createExerciseNote, getAllTags } from "../AddSessionManager"
import { NoteForm } from "./AddNoteForm"


export const AddNoteAndTags = ({exerciseInSession}) => {
    const [ tags, setTags] =useState([])
    const [ showNoteForm, setShowNoteForm] = useState(true)
    const [ newExerciseNote, setNewExerciseNote] = useState({
        exercise_in_session: exerciseInSession.id,
        description: ""
    })

    useEffect(()=> {
        getAllTags()
        .then(data => setTags(data))
    },[])

    

    // const submitTags = (evt) => {
    //     evt.preventDefault()
        
    //     const newNoteTagsObj = {
    //         note: ,
    //         tag: ,
    //     }

    // }

    return(
        <>
        <form>
            {
                showNoteForm
                ? <NoteForm exerciseInSession={exerciseInSession} showNoteForm={showNoteForm} setShowNoteForm={setShowNoteForm}/>
                :null
            }
            <div>
                <label htmlFor="tags">Add Tags</label>
            </div>
            <div>
                {tags.map(tag => {
                    return <>
                    <input
                        required
                        type="checkbox"
                        className="tagsCheckBox"
                        />
                        <label key={tag.id}>{tag.label}</label>
                    
                    </>
                })}
            </div>
            <button>AddTags</button>

        </form>

        </>
    
    )
}