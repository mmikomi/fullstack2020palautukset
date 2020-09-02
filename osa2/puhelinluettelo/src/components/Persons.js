import React from 'react'

const Persons = ({persons, searchCon, removePerson}) => {
    
    const OnePerson = ({person}) => {
        return(
            <div>
                {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
            </div>
        )
    }
    
    const filteredPersons = [...persons].filter(person => person.name.toUpperCase().includes(searchCon.toUpperCase()))

    return(
        filteredPersons.map(x => (<OnePerson key={x.name} person={x}/>))
    )
}

export default Persons