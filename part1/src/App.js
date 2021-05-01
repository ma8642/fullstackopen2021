import React from 'react'

const Header = (props) => {  // renders name of course
  return(<h1>{props.course}</h1>);

}

const Part = (props) => { // a part and number of exercises for that part
  return(<p>{props.part} {props.exercises}</p>);

}
const Content = (props) => { // renders the parts
  return(
    <div>
      <Part part={props.parts[0]} exercises={props.exercises[0]}/>
      <Part part={props.parts[1]} exercises={props.exercises[1]}/>
      <Part part={props.parts[2]} exercises={props.exercises[2]}/>
    </div>
  );

}
const Total = (props) => { // renders total number of exercises
  return(<p>Number of exercises {props.total}</p>);

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
