import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "(040) 123-4567" },
    { name: "Ada Lovelace", number: "(394) 453-2523" },
    { name: "Katherine Johnson", number: "(124) 323-4345" },
    { name: "Mary Poppendieck", number: "(392) 364 2322" },
  ]);
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
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

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
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleChangeFilter} />
      <h1>add new</h1>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
