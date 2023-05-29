const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please provide all arguments");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

const url = `mongodb+srv://robert:${password}@cluster0.7lxfpr9.mongodb.net/Persons?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model("Person", personSchema);

if (name) {
  const person = new Person({
    name: name,
    phone: phone,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${phone} to the phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((pers) => {
      console.log(`${pers.name} ${pers.phone}`);
    });
    mongoose.connection.close();
  });
}
