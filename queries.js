const { pool } = require("./config");

const deleteWords = (request, response) => {
  const id = request.params.id;

  pool.query("DELETE FROM wordlist WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Word deleted with ID: ${id}`);
  });
};
const getWords = (request, response) => {
  pool.query("SELECT * FROM wordlist ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addWords = (request, response) => {
  const word = request.body;

  pool.query("INSERT INTO wordlist (word) VALUES ($1)", [word], error => {
    if (error) {
      throw error;
    }
    response.status(201).json({ status: "success", message: "Word added." });
  });
};
const getWordById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM wordlist WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
module.exports = {
  getWords,
  getWordById,
  addWords,
  //updateUser,
  deleteWords
};
