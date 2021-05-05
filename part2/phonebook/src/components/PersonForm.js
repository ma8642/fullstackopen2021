import React from "react";

const PersonForm = ({
  handleSubmit,
  newName,
  handleChangeName,
  newNumber,
  handleChangeNumber,
}) => {
  return (
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
  );
};

export default PersonForm;
