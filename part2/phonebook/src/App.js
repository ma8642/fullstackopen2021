import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notify, setNotify] = useState({ message: null, messageType: null });

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const notification = ({
    message,
    messageType,
    shouldDelete = false,
    name = "",
  }) => {
    setNotify({
      message,
      messageType,
    });
    setTimeout(() => {
      // remove notification after 5 seconds
      setNotify({ message: null, messageType: null });
    }, 5000);
    if (shouldDelete) {
      // Delete the person from frontend
      const arrayWithoutPerson = persons.filter((p) => p.name !== name);
      setPersons(arrayWithoutPerson);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const indexAlreadyInList = persons.reduce((foundIdx, p, i) => {
      if (p.name.toLowerCase() === newName.toLowerCase()) {
        foundIdx = i;
      }
      return foundIdx;
    }, -1);
    if (indexAlreadyInList >= 0) {
      const outdatedPerson = persons[indexAlreadyInList];
      if (outdatedPerson.number !== newNumber) {
        const updateNumber = window.confirm(
          `${outdatedPerson.name} is already added to phonebook, replace the old number with a new one?`
        );
        if (updateNumber) {
          personService
            .updatePerson(outdatedPerson.id, newPerson)
            .then((returnedPerson) => {
              setPersons([
                ...persons.slice(0, indexAlreadyInList),
                returnedPerson,
                ...persons.slice(indexAlreadyInList + 1),
              ]);
              setNewName("");
              setNewNumber("");
              notification({
                message: `Updated phone number for ${returnedPerson.name}!`,
                messageType: "notif",
              });
            })
            .catch((err) => {
              notification({
                message: `Information of ${newName} has already been removed from server`,
                messageType: "error",
                shouldDelete: true,
                name: newName,
              });
            });
        }
      } else {
        return alert(`${newName} is already added to phonebook`);
      }
    } else {
      personService
        .createPerson(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          notification({
            message: `Added ${returnedPerson.name}!`,
            messageType: "notif",
          });
        })
        .catch((err) => {
          console.log(err.response.status === 409);
          notification({
            message: `${err.response.data.error}`,
            messageType: "error",
            shouldDelete: true,
            name: newName,
          });
        });
    }
  };

  const handleDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService.deletePerson(person.id).catch((err) => {
        notification({
          message: `Information of ${person.name} has already been removed from server`,
          messageType: "error",
        });
      });
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
      <Notification message={notify.message} messageType={notify.messageType} />
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
