const {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
} = require('./myApp'); // change if your file name is different

const log = (label) => (err, data) => {
  if (err) return console.error(`${label} ❌`, err);
  console.log(`${label} ✅`, data);
};

// TEST FUNCTIONS
createAndSavePerson(log("createAndSavePerson"));

createManyPeople([
  { name: "Mary", age: 25, favoriteFoods: ["Burger"] },
  { name: "John", age: 30, favoriteFoods: ["Pizza"] },
  { name: "Prerana", age: 22, favoriteFoods: ["noodles"] },
], log("createManyPeople"));

findPeopleByName("Mary", log("findPeopleByName"));
findOneByFood("Pizza", log("findOneByFood"));
findPersonById("PUT_ID_HERE", log("findPersonById")); // replace ID after creating

findEditThenSave("PUT_ID_HERE", log("findEditThenSave"));
findAndUpdate("Mary", log("findAndUpdate"));
removeById("PUT_ID_HERE", log("removeById"));
removeManyPeople(log("removeManyPeople"));
queryChain(log("queryChain"));

