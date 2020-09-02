import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const getAll = () => (axios.get(baseUrl).then(response => response.data))

const create = newObject => (axios.post(baseUrl, newObject).then(response => response.data))

const remove = removedObject => {
    const personId = removedObject.id
    const removeUrl = `http://localhost:3002/persons/${personId}`

    return(
        axios
            .delete(removeUrl)
    )
}

const update = updateObject => {
    return(
        axios
        .put(`http://localhost:3002/persons/${updateObject.id}`, updateObject)
        .then(response => response.data)
    )
    
}


export default {getAll, create, remove, update}