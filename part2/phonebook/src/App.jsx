import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const personObj = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    if (personExists) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personsService
          .update(personExists.id, personObj)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === personExists.id ? returnedPerson : person,
              ),
            );
            setNewName("");
            setNewNumber("");
            showNotification(
              `${returnedPerson.name}'s number has been modified`,
              "success",
            );
          })
          .catch(() => {
            setNewName("");
            setNewNumber("");
            showNotification(
              `Information of ${personExists.name} has already been removed from the server`,
              "error",
              setPersons(
                persons.filter((person) => person.id !== personExists.id),
              ),
            );
          });
      }
    } else {
      personsService
        .create(personObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          showNotification(`${returnedPerson.name} was added`, "success");
        })
        .catch(() => showNotification(`Failed to add person`, "error"));
    }
  };

  const removePerson = (id, name) => {
    if (confirm(`Remove ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          showNotification(`${name} has been removed`, "success");
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          showNotification(
            `${name} has already been removed from the server`,
            "error",
            setPersons(persons.filter((person) => person.id !== id)),
          );
        });
    }
  };

  const showNotification = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Notification message={message} />

      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        label="delete"
        remove={removePerson}
      />
    </div>
  );
};

export default App;
