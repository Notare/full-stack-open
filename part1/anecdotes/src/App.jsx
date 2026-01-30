import { useState } from "react";

const Title = ({ title }) => <h2>{title}</h2>;

const Display = ({ text }) => <p>{text}</p>;

const Button = ({ onClick, name }) => <button onClick={onClick}>{name}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const mostVotes = Math.max(...votes);
  const mostVotesIndex = votes.indexOf(mostVotes);

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected]++;
    setVotes(votesCopy);
  };

  const getRandomNumber = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <div>
      <Title title="Anecdote of the day" />
      <Display text={anecdotes[selected]} />
      <Display text={`has ${votes[selected]} votes`} />
      <Button onClick={handleVote} name="vote" />
      <Button onClick={getRandomNumber} name="next anecdote" />

      <Title title="Anecdote with most votes" />
      <Display text={anecdotes[mostVotesIndex]} />
      <Display text={`has ${mostVotes} votes`} />
    </div>
  );
};

export default App;
