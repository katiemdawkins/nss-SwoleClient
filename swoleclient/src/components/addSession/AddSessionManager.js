//Session
export const getSessions = () => {
    return fetch ("http://localhost:8000/training_log", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}

export const getSessionById = (sessionId) => {
    return fetch(`http://localhost:8000/training_log/${sessionId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const createSession = (session) => {
    return fetch("http://localhost:8000/training_log", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(session) 
    })
    .then(res=>res.json())
}

export const updateSessionToComplete = (session) => {
    return fetch(`http://localhost:8000/training_log/${session.id}/isCompleteTrue`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(session)
    })
}
export const updateSession = (session) => {
    return fetch(`http://localhost:8000/training_log/${session.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(session)
    })
}

export const deleteSession = (sessionId) => {
    return fetch(`http://localhost:8000/training_log/${sessionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`}
        })
}

///Exercise In Session
export const getExercisesInSession = (session) => {
    let url = "http://localhost:8000/exercises_in_session?"

    if(session) {
        url+= `session=${session}`
    }
    return fetch(url, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}

export const getExerciseInSessionById = (exerciseInSessionId) => {
    return fetch(`http://localhost:8000/exercises_in_session/${exerciseInSessionId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const createExerciseInSession = (exercise) => {
    return fetch("http://localhost:8000/exercises_in_session",{
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(exercise) 
    })
}

export const updateExerciseInSession = (exerciseInSession) => {
    return fetch(`http://localhost:8000/exercises_in_session/${exerciseInSession.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(exerciseInSession)
    })
}

////////TAGS

export const getAllTags = () => {
    return fetch ("http://localhost:8000/tags", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}

///ExerciseNote
export const createExerciseNote = (note) => {
    return fetch("http://localhost:8000/exercise_notes",{
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note) 
    })
}

export const getAllNotes = (exercise_in_session) => {
    let url = `http://localhost:8000/exercise_notes?`

    if (exercise_in_session){
        url+= `exercise_in_session=${exercise_in_session}`
    }
    return fetch (url, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}

export const getNoteById = (noteId) => {
    return fetch(`http://localhost:8000/exercise_notes/${noteId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const getLastNote = () => {
    return fetch(`http://localhost:8000/exercise_notes/getLastNote`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const updateNote = (note)=> {
    return fetch(`http://localhost:8000/exercise_notes/${note.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
}

//get exercise note by exercise in session id

export const getNoteByExerciseInSessionId = (exerciseInSessionId) => {
    return fetch(`http://localhost:8000/exercise_notes/${exerciseInSessionId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}


