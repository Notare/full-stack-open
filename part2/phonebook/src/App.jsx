import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
          })
          .catch((error) => console.log("error updating"));
      }
    } else {
      personsService
        .create(personObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => console.log("error adding person"));
    }
  };

  const removePerson = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => console.log("failed to delete person"));
    }
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
