import { useState } from "react";

const Title = ({ title }) => (
  <div>
    <h2>{title}</h2>
  </div>
);

const Button = ({ onClick, name }) => <button onClick={onClick}>{name}</button>;

const Display = ({ name, counter }) => (
  <div>
    {name} {counter}
  </div>
);

const Statistics = ({
  good,
  neutral,
  bad,
  totalFeedback,
  avgFeedback,
  positiveFeedback,
}) => {
  if (totalFeedback === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <Title title="statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalFeedback} />
          <StatisticLine text="average" value={avgFeedback} />
          <StatisticLine text="positive" value={`${positiveFeedback}%`} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const totalFeedback = good + neutral + bad;
  const avgFeedback = (good - bad) / totalFeedback;
  const positiveFeedback = (good / totalFeedback) * 100;

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <Title title="give feedback" />
      <Button onClick={increaseGood} name="good" />
      <Button onClick={increaseNeutral} name="neutral" />
      <Button onClick={increaseBad} name="bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedback={totalFeedback}
        avgFeedback={avgFeedback}
        positiveFeedback={positiveFeedback}
      />
    </div>
  );
};

export default App;
