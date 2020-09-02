import React from 'react'

const Course = ({course}) => {

    const Header = ({ course }) => {
      return (
        <h3>{course.name}</h3>
      )
    }
  
    const Content = ({ course }) => {
  
      return (
        <div>
          {course.parts.map(x => <Part key={x.id} part={x} />)}
        </div>
      )
    }
  
    const Part = (props) => {
      return (
        <p>
          {props.part.name} {props.part.exercises}
        </p>    
      )
    }
  
    const Total = ({course}) => {
      return(
        <div>
          <b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
        </div>
      )
    }
  
    return(
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

export default Course