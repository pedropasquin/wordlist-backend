const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3005;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.delete("/words/:id", db.deleteWords);
app.get("/words", db.getWords);
//app.get("/words/:id", db.getWordById);
app.post("/words", db.addWords);
//app.put("/users/:id", db.updateUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
