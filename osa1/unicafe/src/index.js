import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (<h1>{text}</h1>)

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td> 
      <td> {value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, sum, avg}) => {

  if(sum === 0) {
    return (
      <div>Palautetta ei vielä ole annettu.</div>
    )
  }

  const countAverage = () => {
    if (sum === 0){
      return(
        0
      )
    }

    return(
      avg / sum
    )
  }

  const countGoodPercentile = () => {
    if(sum === 0){
      return '0 %'
    }

    return (
      good / sum * 100 + ' %'
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text='Hyvä' value={good} />
          <StatisticsLine text='Neutraali' value={neutral} />
          <StatisticsLine text='Huono' value={bad} />
          <StatisticsLine text='Palautteita yht.' value={sum} />
          <StatisticsLine text='Palautteen keskiarvo' value={countAverage()} />
          <StatisticsLine text='Positiivisia yht.' value={countGoodPercentile()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)
  const [avg, setAvg] = useState(0)

  const handleGoodClick = () => {
    setGood (good + 1)
    setSum (sum + 1)
    setAvg (avg + 1)
  }

  const handleNeutralClick = () => {
    setNeutral (neutral + 1)
    setSum (sum + 1)
  }

  const handleBadClick = () => {
    setBad (bad + 1)
    setSum (sum + 1)
    setAvg (avg - 1)
  }

  

  return (
    <div>
      <Header text='Anna palautetta!' />
      <Button text='Hyvä' onClick={handleGoodClick} />
      <Button text='Neutraali' onClick={handleNeutralClick} />
      <Button text='Huono' onClick={handleBadClick} />
      <Header text='Tilastot' />
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum} avg={avg}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)