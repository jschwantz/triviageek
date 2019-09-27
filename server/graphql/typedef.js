const {fileLoader, mergeTypes} = require('merge-graphql-schemas')
const path = require('path')

const typesArray = fileLoader(path.join(__dirname, './typedefs'))
console.log(typesArray)
console.log(typesArray[0])
console.log(typesArray[1])
const typeDefs = mergeTypes(typesArray, {all: true})
console.log(typeDefs)
module.exports = typeDefs

// # games: [GamePlay] @connection(name: "UserPlays")
//   # games: [GamePlay] @connection(name: "GamePlays")
