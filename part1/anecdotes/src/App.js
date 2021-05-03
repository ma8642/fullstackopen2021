import React, { useState } from "react";

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
      <div id="anecdote">{anecdotes[selected]}</div>
      <div id="votes">has {points[selected]} votes</div>
      <button onClick={handleClick}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
    </div>
  );
};

export default App;
