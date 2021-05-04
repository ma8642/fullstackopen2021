import React from "react";

const Header = ({ title }) => {
  // renders name of course
  return <h1>{title}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);
  return (
    <p>
      <b>total of {totalExercises} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
