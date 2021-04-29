import {API_KEY} from './Constants';

//have fetch calls in one file
const baseURL = `https://api.giphy.com/v1/gifs`
const url = `https://api.giphy.com/v1/gifs/trending?limit=15&api_key=${API_KEY}`;
const individualUrl = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}`;
const searchURL = `https://api.giphy.com/v1/gifs/search?limit=15&api_key=${API_KEY}`
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
}

export async function getTrendingGifs(offset) {
    const gifs = await fetch(baseURL + `/trending?offset=${offset}&limit=15&api_key=${API_KEY}`, options)
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

export async function searchGifs(search) {
    const gifs = await fetch(searchURL + `&q=${search}`, options)
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