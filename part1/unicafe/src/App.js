import React, { useState } from 'react';
const SectionTitle = ({title}) => <h1>{title}</h1>;
const Button = ({title, handleClick}) => <button onClick={handleClick}>{title}</button>;
const Statistic = ({title, stat}) => <p>{title} {stat}</p>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div id="give-feedback">
        <SectionTitle title={"give feedback"} />
        <Button title={"good"} handleClick={() => setGood(good + 1)}/>
        <Button title={"neutral"} handleClick={() => setNeutral(neutral + 1)}/>
        <Button title={"bad"} handleClick={() => setBad(bad + 1)}/>
      </div>
      <div id="statistics">
        <SectionTitle title={"statistics"} />
        <Statistic title={"good"} stat={good} />
        <Statistic title={"neutral"} stat={neutral} />
        <Statistic title={"bad"} stat={bad} />
      </div>
    </div>
  );
}

export default App;
