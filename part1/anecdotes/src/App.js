import React, { useState } from "react";

const SectionTitle = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ title, handleClick }) => {
  return <button onClick={handleClick}>{title}</button>;
};

const AnecdoteOfTheDay = ({
  anecdotes,
  selected,
  points,
  handleVote,
  handleClick,
}) => {
  return (
    <div>
      <SectionTitle title={"Anecdote of the day"} />
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button title={"vote"} handleClick={handleVote} />
      <Button title={"next anecdote"} handleClick={handleClick} />
    </div>
  );
};

const MostVotedAnecdote = ({ anecdotes, points }) => {
  const mostVotedIdx = points.indexOf(Math.max(...points));
  return (
    <div>
      <SectionTitle title={"Anecdote with the most votes"} />
      <p>{anecdotes[mostVotedIdx]}</p>
      <p>has {points[mostVotedIdx]} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.from(Array(anecdotes.length), () => 0)
  ); // initialize to list of 0's

  const handleClick = () => {
    const randIdx = Math.floor(Math.random() * anecdotes.length);
    setSelected(randIdx);
  };
  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  return (
    <div>
      <AnecdoteOfTheDay
        anecdotes={anecdotes}
        selected={selected}
        points={points}
        handleVote={handleVote}
        handleClick={handleClick}
      />
      <MostVotedAnecdote anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
