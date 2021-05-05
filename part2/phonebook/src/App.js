import React, { useState } from "react";

const PhonebookEntry = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "(040) 123-4567" },
    { name: "Ada Lovelace", number: "(394) 453-2523" },
    { name: "Dan Abramov", number: "(124) 323-4345" },
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
      <label for="filter">filter shown with </label>
      <input name="filter" value={filter} onChange={handleChangeFilter} />
      <h1>add new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="name">name:</label>
          <input name="name" value={newName} onChange={handleChangeName} />
        </div>
        <div>
          <label for="number">number:</label>
          <input
            name="number"
            value={newNumber}
            type="tel"
            pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
            placeholder="(XXX) XXX-XXXX"
            onChange={handleChangeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <PhonebookEntry key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
