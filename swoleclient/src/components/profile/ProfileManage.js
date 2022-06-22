export const getSwoleUser = () => {
    return fetch( `http://localhost:8000/swoleUsers/id`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const getSessionsForRatings = (user, is_complete) => {
    let url = "http://localhost:8000/training_log/getSessionsForRatings?"

    if (user) {
        url+=`user=${user}&`
    }
    if (is_complete) {
        url+=`is_complete=${is_complete}&`
    }
    return fetch(url, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}

export const getCompletedSessions = () => {

    return fetch("http://localhost:8000/training_log?is_complete", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}
