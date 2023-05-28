const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(data);
})

app.get('/info', (req, res) => {
    let length = data.length;
    let date = new Date();
    res.send(`<p>Phonebook has info for ${length} people</p><p>${date}</p>`);
})

app.get('/api/persons/:id', (req, res) => {
    let id = Number(req.params.id);
    let person = data.find(p => p.id === id);
    if (person) {
        res.send(person);
    } else {
        res.status(404).send('<h1>No person found!</h1>');
    }
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})