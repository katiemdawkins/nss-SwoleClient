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

///Exercise In Session
export const getExercisesInSession = () => {
    return fetch ("http://localhost:8000/exercises_in_session", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}

export const createExerciseInSession = (exercise) => {
    return fetch("http://localhost:8000/exercises_in_session",{
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(exercise) 
    }).then(res=>res.json())
}

//.then(getExercisesInSession)