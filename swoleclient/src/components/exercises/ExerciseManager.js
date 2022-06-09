export const getExercises = (exerciseName, category, bodyPart, clear) => {
    let url = "http://localhost:8000/exercises?"
    if (exerciseName) {
        url+= `name=${exerciseName}&`
    } 
    if (category) {
        url+=`category=${category}&`
    }
    if (bodyPart) {
        url+=`body_part=${bodyPart}&`
    }
    if (clear) {
        url +=``
    }

    return fetch(url, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}

export const getExerciseById = (exerciseId) => {
    return fetch(`http://localhost:8000/exercises/${exerciseId}`,{
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const getBodyParts = () => {
    return fetch("http://localhost:8000/body_parts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}
export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}

//Stretch goal createExercise