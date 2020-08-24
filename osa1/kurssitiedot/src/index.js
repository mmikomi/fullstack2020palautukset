import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
  <h1>
    {props.kurssi}
  </h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.osa.name} {props.osa.exercises}</p>
  )
}

const Content = (props) => {
 return (
  <div>
    <Part osa={props.osat[0]} />
    <Part osa={props.osat[1]} />
    <Part osa={props.osat[2]} />
  </div>
 )
}

const Total = (props) => {
  
  let summa = 0

  props.osat.forEach(value => {
    summa += value.exercises
  });

  return (
    <p>Tehtäviä on yhteensä {summa}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header kurssi={course.name} />
      <Content osat={course.parts} />
      <Total osat={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))