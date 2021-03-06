import React, { useState } from 'react';
const SectionTitle = ({title}) => <h1>{title}</h1>;

const Button = ({title, handleClick}) => <button onClick={handleClick}>{title}</button>;

const Statistic = ({title, stat}) => {
  return(
    <tr>
      <td>{title}</td>
      <td>{stat}</td>
    </tr>
  );
}

const All = ({allScores}) => {
  const total = allScores.reduce((total, score) => {
     return total + score;
    }, 0);
    return(
      <tr>
        <td>all</td>
        <td>{total}</td>
      </tr>
    );
};

const Average = ({good, neutral, bad}) => {
  const totalGood = good * 1;
  const totalNeutral = 0;
  const totalBad = bad * -1;
  let avg = (totalGood + totalNeutral + totalBad) / (good + neutral + bad);
  if (Number.isNaN(avg)) {
    avg = 0;
  }
  return(
    <tr>
      <td>average</td>
      <td>{Math.round(avg * 10) / 10}</td>
    </tr>
  );
};

const PercentPositiveFeeback = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  let percentPositive = (good * 100) / total;
  if (Number.isNaN(percentPositive)) {
    percentPositive = 0;
  }
  return(
    <tr>
      <td>positive</td>
      <td>{Math.round(percentPositive * 10) / 10}%</td>
    </tr>
  );
}

const Statistics = ({good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div id="statistics">
        <SectionTitle title={"statistics"} />
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div id="statistics">
      <SectionTitle title={"statistics"} />
      <table>
        <Statistic title={"good"} stat={good} />
        <Statistic title={"neutral"} stat={neutral} />
        <Statistic title={"bad"} stat={bad} />
        <All allScores={[good, neutral, bad]}/>
        <Average good={good} neutral={neutral} bad ={bad} />
        <PercentPositiveFeeback good={good} neutral={neutral} bad={bad} />
      </table>
    </div>
  );
}

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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
