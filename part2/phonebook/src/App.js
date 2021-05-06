import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService.createPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService.deletePerson(person.id);
      const arrayWithoutPerson = persons.filter((p) => p.id !== person.id);
      setPersons(arrayWithoutPerson);
    }
  };

  useEffect(() => {
    personService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []); // empty array ensure that effect will get called during first render

  const personsToShow =
    filter.length === 0
      ? persons
      : persons.filter(
          (person) =>
            person.name.slice(0, filter.length).toLowerCase() ===
            filter.toLowerCase()
        );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleChange={handleChangeFilter} />
      <h2>add new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person
          key={person.name}
          person={person}
          handleClick={() => handleDelete(person)}
        />
      ))}
    </div>
  );
};

export default App;
