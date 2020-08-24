import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [winner, setWinner] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const vote = () => {
    const copyVote = [...points]
    copyVote[selected] += 1
    setPoints(copyVote)

    if(copyVote[selected] > copyVote[winner]){
      setWinner(selected)
    }
  }

  const checkBest = () => {
    return(
      points[selected]
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h3>{props.anecdotes[selected]}</h3>
      <h4>has {points[selected]} votes</h4>
      <h5>testi: {points}</h5>
      <Button text='vote' onClick={vote} />
      <Button text='next anecdote' onClick={nextAnecdote} />

      <h1>Anecdote with the most votes</h1>
      <h3>{props.anecdotes[winner]}</h3>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)