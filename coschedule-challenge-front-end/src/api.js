import {API_KEY} from './Constants';

//have fetch calls in one file
const baseURL = `https://coschedule-challenge-backend.herokuapp.com`;
let testBaseURL = `http://localhost:3000`;
testBaseURL = baseURL;
const individualUrl = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}`;
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
}

const postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}

const deleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}

export async function getTrendingGifs(offset) {
    const gifs = await fetch(testBaseURL + `/gifs?offset=${offset}`, options)
        .then(response => 
            response.json()
        )
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        })
    return gifs;
}

export async function getGif(id) {
    const gifs = await fetch(individualUrl + `&ids=${id}`, options)
        .then(response => 
            response.json()
        )
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        })
    return gifs;
}

export async function searchGifs(search, offset) {
    const gifs = await fetch(testBaseURL + `/gifs?search=${search}&offset=${offset}`, options)
        .then(response => 
            response.json()
        )
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        })
    return gifs;
}

export async function getComments(gifId) {
    const response = await fetch(testBaseURL + `/comments?gifId=${gifId}`, options)
        .then(response => 
            response.json()    
        )
        .then(data => {
            return data;
        })
    return response;
}

export async function createComment(gifId, comment) {
    const body = {
        'comment': comment
    };

    const response = await fetch(testBaseURL + `/comments?gifId=${gifId}`, {...postOptions, 
        headers: {...postOptions.headers, 'token': localStorage.getItem('token')},
        body: JSON.stringify(body)
    })
        .then(response => 
            response.json()    
        )
        .then(data => {
            return data;
        })
    return response;
}

export async function deleteComment(commentId) {
    const response = await fetch(testBaseURL + `/comment?commentId=${commentId}`, {...deleteOptions,
        headers: {...postOptions.headers, 'token': localStorage.getItem('token')}
    })
        .then(response => 
            response.json()    
        )
        .then(data => {
            return data;
        })
    return response;
}

export async function getRatings() {
    const response = await fetch(testBaseURL + `/ratings`, options)
        .then(response => 
            response.json()    
        )
        .then(data => {
            return data;
        })
    return response;
}

export async function createRating(gifId, rating) {
    const response = await fetch(testBaseURL + `/ratings?gifId=${gifId}&rating=${rating}`, {...postOptions, 
        headers: {...postOptions.headers, 'token': localStorage.getItem('token')},
    })
        .then(response => 
            response.json()    
        )
        .then(data => {
            return data;
        })
    return response;
}

export async function login(email, password) {
    const body = {
        'email': email,
        'password': password
    };

    const response = await fetch(testBaseURL + `/login`, {...postOptions, 
        body: JSON.stringify(body)
    })
        .then(response => 
            response.json()    
        )
        .then(data => {
            return data;
        })
    return response;
}

export async function register(username, email, password) {
    const body = {
        'username': username,
        'email': email,
        'password': password
    };

    const response = await fetch(testBaseURL + `/register`, {...postOptions, 
        body: JSON.stringify(body)
    })
        .then(response => 
            response.json()    
        )
        .then(data => {
            return data;
        })
    return response;
}

export async function getUser() {
    const response = await fetch(testBaseURL + `/user`, {...options, 
        headers: {...options.headers, 'token': localStorage.getItem('token')}
    })
        .then(response => 
            response.json()    
        )
        .then(data => {
            return data;
        })
    return response;
}