export const getSessions = () => {
    return fetch(`http://localhost:8000/training_log`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}


export const getSessionById = (sessionId) => {
    return fetch(`http://localhost:8000/exercises/${sessionId}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}