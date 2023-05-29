require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("data", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);



app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.get("/info", (req, res) => {
  let length = data.length;
  let date = new Date();
  res.send(`<p>Phonebook has info for ${length} people</p><p>${date}</p>`);
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  let person = req.body;
  if (!person.name) {
    res.status(400).json({
      error: "name missing",
    });
  } else {
    // if (data.find((p) => p.id === person.id)) {
    //   res.status(400).json({
    //     error: "person already exists",
    //   });
    // } else {
    const personToAdd = new Person({
      name: person.name,
      number: person.number,
    });

    personToAdd.save().then((savedPerson) => {
      res.json(savedPerson);
    });
  }
  // }
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
