require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log("MongoDB connected sucessefully");
});


const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to log request details
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Body-parser middleware (Task 11)
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static assets (Task 4)
app.use("/public", express.static(__dirname + "/public"));

// Serve HTML file (Task 3)
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Serve JSON with optional uppercase based on .env (Task 5 + 6)
app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

// Route parameters - Echo route (Task 9)
app.get('/:word/echo', function (req, res) {
  const word = req.params.word;
  res.json({ echo: word });
});

// GET + POST route with same path /name (Task 10 + 12)
app.route("/name")
  .get(function (req, res) {
    const first = req.query.first;
    const last = req.query.last;

    const firstIsPresent = typeof first !== "undefined";
    const lastIsPresent = typeof last !== "undefined";

    const hasFirst = firstIsPresent && first.trim() !== "";
    const hasLast = lastIsPresent && last.trim() !== "";

    if (firstIsPresent && !hasLast && !hasFirst) {
      // Only "first" key is passed with no value
      return res.json({ name: "prerana" });
    }

    if (lastIsPresent && !hasFirst && !hasLast) {
      // Only "last" key is passed with no value
      return res.json({ name: "bubbly" });
    }

    if (hasFirst && hasLast) {
      return res.json({ name: `${first} ${last}` });
    }

    if (hasFirst && !hasLast) {
      return res.json({ name: first });
    }

    if (hasLast && !hasFirst) {
      return res.json({ name: last });
    }

    // Nothing passed at all
    return res.json({ name: "prerana bubbly" });
  });


  app.post("/name", function(req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({ name: `${firstName} ${lastName}` });
  });


  const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Prerana Bubbly",
    age: 22,
    favoriteFoods: ["nooodles", "Pasta", "Mango"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};


const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }, // return updated document
    (err, updatedDoc) => {
      if (err) return done(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    return done(null, result);
  });
};


const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")               // sort by name (ascending)
    .limit(2)                   // limit to 2 results
    .select("-age")             // exclude the 'age' field
    .exec((err, data) => {
      if (err) return done(err);
      return done(null, data);
    });
};



module.exports = app;




