/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const updatePerson = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
};
