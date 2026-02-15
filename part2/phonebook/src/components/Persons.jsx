const Persons = ({ personsToShow, remove, label }) => (
  <ul>
    {personsToShow.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={() => remove(person.id, person.name)}>{label}</button>
      </li>
    ))}
  </ul>
);

export default Persons;
