export const getSessions = (user, is_complete) => {
    let url= `http://localhost:8000/training_log?`

    if(user){
        url+=`user=${user}&`
    }
    if(is_complete){
        url+=`user=${is_complete}&`
    }

    return fetch( url,{
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}


export const getSessionById = (sessionId) => {
    return fetch(`http://localhost:8000/training_log/${sessionId}/getSessionDetails`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const getCurrentUser = () => {
    return fetch( `http://localhost:8000/swoleUsers/id`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const getNoteByExerciseInSessionId = (exerciseInSessionId) => {
    return fetch(`http://localhost:8000/exercise_notes/${exerciseInSessionId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}