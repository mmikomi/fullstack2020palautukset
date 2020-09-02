import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({message}) => {

    if(message === null){
        return null
    }

    const errorStyle = {
        color: 'red',
        background: 'white',
        fontSize: 22,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notiStyle = {
        color: 'green',
        background: 'white',
        fontSize: 22,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if(message.includes('ERROR:')){
        return(
            <div style={errorStyle}>
                {message}
            </div>
        )
    }

    return(
        <div style={notiStyle}>
            {message}
        </div>
    )
}

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchCon, setSearchCon ] = useState('')
    const [ notification, setNotification ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const updatePerson = (newName, newNumber) => {

        const thePerson = persons.filter(p => p.name === newName.trim())[0]
        const changedPerson = {...thePerson, number:newNumber}
        const personId = thePerson.id

        personService
            .update(changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id === personId ? returnedPerson : person))
            })
            .catch(error => {
                setNotification(`ERROR: The person ${thePerson.name} has already been removed from the server.`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const addPerson = (event) => {
        event.preventDefault()

        if(persons.some(e => e.name === newName.trim())){
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                updatePerson(newName, newNumber)
                setNotification(
                    `The number for ${newName} has been changed.`
                )
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
                setNewName('')
                setNewNumber('')
            }else{
                alert(`Did not modify number for ${newName.trim()}.`)
            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotification(
                        `${personObject.name} has been added to the phonebook.`
                    )
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
        }
    }

    const removePerson = (person) => {

        if(window.confirm(`Delete ${person.name}?`)){
           personService
                .remove(person)
                .then(
                    setPersons(persons.filter(x => x.id !== person.id)),
                    setNotification(
                        `${person.name} has been removed from the phonebook.`
                    ),
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                )
        }
        
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchCon(event.target.value)
    }
  
    return (
      <div>
        <h2>Phonebook</h2>

        <Notification message={notification} />

        <Filter value={searchCon} onChange={handleSearchChange} />

        <h2>Add new</h2>
        
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

        <h2>Numbers</h2>
        
        <Persons persons={persons} searchCon={searchCon} removePerson={removePerson}/>
      </div>
    )
  
  }
  
  export default App