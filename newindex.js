const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./config");
const app = express();
const port = 3005;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

const getWords = (request, response) => {
  pool.query("SELECT * FROM wordlist", (error, results) => {
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

const deleteWords = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM wordlist WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Word deleted with ID: ${id}`);
  });
};
app
  .route("/words/:id")
  // DELETE endpoint
  .delete(deleteWords);

app
  .route("/words")
  // GET endpoint
  .get(getWords)
  // POST endpoint
  .post(addWords);

// Start server
app.listen(process.env.PORT || 3005, () => {
  console.log(`Server listening`);
});
