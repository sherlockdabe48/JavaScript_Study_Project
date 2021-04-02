const me = {
  name: "Dab",
  age: 25,
  human: true,
}
const zigkie = {
  name: "Zigkie",
  age: 24,
  human: true,
}

function printUser(person) {
  console.log(`Name: ${person.name}. Age: ${person.age}`)
}

module.exports = {
  me: me,
  zigkie: zigkie,
  printUser: printUser
}